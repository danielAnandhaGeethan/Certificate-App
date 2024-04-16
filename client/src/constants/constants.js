const contractAddress = "0x0e296CF541CB041f1761aF0dC95e51e4d6479AbF";

const contractAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x06fdde03",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "data",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0xe283b4dd",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_cid",
        type: "string",
      },
    ],
    name: "pushData",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x06b1efe5",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_address",
        type: "address",
      },
    ],
    name: "getSize",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x504f1671",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_address",
        type: "address",
      },
      {
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getData",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x2979d025",
  },
];

const files = [
  "10th Marksheet",
  "12th Marksheet",
  "Aadhar",
  "Community Certificate",
  "Nativity Certificate",
  "Transfer Certificate",
  "Conduct Certificate",
];

export { contractAddress, contractAbi, files };
