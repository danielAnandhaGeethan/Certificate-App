// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Certificates {
    string public name;

    mapping(address => string[]) public data;

    constructor() public {
        name = "certificates";
    }

    function pushData(address _address, string memory _cid) public {
        require(msg.sender != address(0));
        require(bytes(_cid).length > 0);

        data[_address].push(_cid);
    }

    function getSize(address _address) public view returns (uint256){

        return data[_address].length;
    }

    function getData(address _address, uint256 _index) public view returns (string memory) {
    
        require(_index < data[_address].length, "Index out of range");
        return data[_address][_index];
    }
}