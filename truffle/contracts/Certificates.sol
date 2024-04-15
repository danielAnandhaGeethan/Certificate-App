// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Certificates {
    string public name;

    mapping(address => string) public data;

    constructor() public {
        name = "certificates";
    }

    function pushData(string memory _cid) public {
        require(msg.sender != address(0));
        require(bytes(_cid).length > 0);

        address _addr = msg.sender;

        data[_addr] = _cid;
    }

    function getData(address _address) public view returns (string memory) {
    
        return data[_address];
    }
}