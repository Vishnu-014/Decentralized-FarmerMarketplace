// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract FarmerContract {
    address public farmer;

    struct Product {
        string productName;
        uint256 productPrice;
        uint256 weight; // Weight of the product produced by the farmer
        bool isProductSold;
        string imageUrl; // Image URL for the product
    }

    Product[] public products;

    struct PurchaseDetails {
        address buyer;
        uint256 purchaseWeight;
        string username;
        string phoneNumber;
        string buyerAddress;
    }

    mapping(string => PurchaseDetails[]) private productPurchaseDetails;

    event ProductAdded(
        address indexed farmer,
        string productName,
        uint256 productPrice,
        uint256 weight,
        string imageUrl
    );
    event ProductSold(
        address indexed farmer,
        address indexed buyer,
        string productName,
        uint256 productPrice,
        uint256 weight,
        string username,
        string phoneNumber,
        string buyerAddress
    );
    event ProductPriceUpdated(
        address indexed farmer,
        string productName,
        uint256 newProductPrice
    );
    event ProductWeightUpdated(
        address indexed farmer,
        string productName,
        uint256 newWeight
    );
    event ProductRemoved(address indexed farmer, string productName);

    constructor() {
        farmer = msg.sender;
    }

    // Function to add a new product for sale
    function addProduct(
        string memory _productName,
        uint256 _productPrice,
        uint256 _weight,
        string memory _imageUrl
    ) public {
        require(msg.sender == farmer, "Only the farmer can add products");

        products.push(
            Product(_productName, _productPrice, _weight, false, _imageUrl)
        );
        emit ProductAdded(
            farmer,
            _productName,
            _productPrice,
            _weight,
            _imageUrl
        );
    }

    // Function for the supply company to purchase the product using the product name and weight
    function purchaseProduct(
        string memory _productName,
        uint256 purchaseWeight,
        string memory username,
        string memory phoneNumber,
        string memory buyerAddress
    ) public payable {
        require(
            msg.sender != farmer,
            "Farmers cannot purchase their own products"
        );

        for (uint256 i = 0; i < products.length; i++) {
            if (
                keccak256(bytes(products[i].productName)) ==
                keccak256(bytes(_productName))
            ) {
                Product storage product = products[i];
                require(!product.isProductSold, "Product already sold");
                require(
                    purchaseWeight > 0 && purchaseWeight <= product.weight,
                    "Invalid purchase weight"
                );
                require(
                    msg.value == (product.productPrice * purchaseWeight),
                    "Incorrect payment amount"
                );

                product.weight -= purchaseWeight; // Subtract the purchased weight from the original weight

                // Record the purchase details in the mapping
                PurchaseDetails memory purchaseInfo = PurchaseDetails({
                    buyer: msg.sender,
                    purchaseWeight: purchaseWeight,
                    username: username,
                    phoneNumber: phoneNumber,
                    buyerAddress: buyerAddress
                });
                productPurchaseDetails[_productName].push(purchaseInfo);

                emit ProductSold(
                    farmer,
                    msg.sender,
                    product.productName,
                    product.productPrice,
                    purchaseWeight,
                    username,
                    phoneNumber,
                    buyerAddress
                );

                if (product.weight == 0) {
                    product.isProductSold = true; // Mark the product as sold
                    emit ProductRemoved(farmer, product.productName);
                }

                return;
            }
        }
        revert("Product not found");
    }

    // Function to withdraw the funds after selling the product
    function withdrawFunds() public {
        require(msg.sender == farmer, "Only the farmer can withdraw funds");
        uint256 totalBalance;
        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].isProductSold) {
                totalBalance += products[i].productPrice * products[i].weight;
                products[i].isProductSold = false; // Reset the product status for the next cycle
            }
        }
        require(totalBalance > 0, "No funds to withdraw");

        payable(farmer).transfer(totalBalance);
    }

    // Function to get the total number of products
    function getTotalProducts() public view returns (uint256) {
        return products.length;
    }

    // Function to get all product details
    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }

    // Function to get product details by name
    function getProductByName(
        string memory _productName
    ) public view returns (Product memory) {
        for (uint256 i = 0; i < products.length; i++) {
            if (
                keccak256(bytes(products[i].productName)) ==
                keccak256(bytes(_productName))
            ) {
                return products[i];
            }
        }
        revert("Product not found");
    }

    // Function to get the available quantity (weight) of a specific product that is currently not sold
    function getAvailableProductQuantity(
        string memory _productName
    ) public view returns (uint256) {
        for (uint256 i = 0; i < products.length; i++) {
            if (
                keccak256(bytes(products[i].productName)) ==
                keccak256(bytes(_productName))
            ) {
                return products[i].weight;
            }
        }
        revert("Product not found");
    }

    // Function to get the quantity (weight) of a specific product that has been sold
    function getSoldProductQuantity(
        string memory _productName
    ) public view returns (uint256) {
        for (uint256 i = 0; i < products.length; i++) {
            if (
                keccak256(bytes(products[i].productName)) ==
                keccak256(bytes(_productName))
            ) {
                return
                    products[i].isProductSold
                        ? (products[i].weight -
                            getAvailableProductQuantity(_productName))
                        : 0;
            }
        }
        revert("Product not found");
    }

    // Function to get the total number of products that have been sold
    function getTotalSoldProducts() public view returns (uint256) {
        uint256 totalSoldProducts = 0;
        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].isProductSold) {
                totalSoldProducts++;
            }
        }
        return totalSoldProducts;
    }

    // Function to get the total number of products that are currently available and not sold
    function getTotalUnsoldProducts() public view returns (uint256) {
        uint256 totalUnsoldProducts = 0;
        for (uint256 i = 0; i < products.length; i++) {
            if (!products[i].isProductSold) {
                totalUnsoldProducts++;
            }
        }
        return totalUnsoldProducts;
    }

    // Function to get the current balance of the farmer's contract
    function getFarmerBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to allow the farmer to transfer the contract ownership to a new address
    function updateFarmerAddress(address newFarmer) public {
        require(
            msg.sender == farmer,
            "Only the farmer can update the contract owner"
        );
        farmer = newFarmer;
    }

    // Function to withdraw the contract's balance to the farmer's account
    function withdrawFarmerBalance() public {
        require(
            msg.sender == farmer,
            "Only the farmer can withdraw the balance"
        );

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        payable(farmer).transfer(balance);
    }

    // Function to get the purchase details for a specific product by its name
    function getProductPurchaseDetails(
        string memory _productName
    ) public view returns (PurchaseDetails[] memory) {
        return productPurchaseDetails[_productName];
    }

    // Function to get all purchased products
    function getAllPurchasedProducts() public view returns (Product[] memory) {
        uint256 purchasedProductCount = getTotalSoldProducts();
        Product[] memory purchasedProducts = new Product[](
            purchasedProductCount
        );
        uint256 index = 0;

        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].isProductSold) {
                purchasedProducts[index] = products[i];
                index++;
            }
        }

        return purchasedProducts;
    }

    // Function to update the price of a product by its name
    function updateProductPrice(
        string memory _productName,
        uint256 newPrice
    ) public {
        require(
            msg.sender == farmer,
            "Only the farmer can update the product price"
        );

        for (uint256 i = 0; i < products.length; i++) {
            if (
                keccak256(bytes(products[i].productName)) ==
                keccak256(bytes(_productName))
            ) {
                products[i].productPrice = newPrice;
                emit ProductPriceUpdated(farmer, _productName, newPrice);
                return;
            }
        }
        revert("Product not found");
    }
}
