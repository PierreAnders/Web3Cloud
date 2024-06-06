// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    string[] public uris;

    function storeUri(string memory uri) public {
        uris.push(uri);
    }

    function getUri(uint index) public view returns (string memory) {
        require(index < uris.length, "Index out of bounds");
        return uris[index];
    }
}