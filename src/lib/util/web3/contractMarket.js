const environment = process.env.NEXT_PUBLIC_ENV || 'dev'

export const purchaseABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'asset', type: 'address' },
      { indexed: false, internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'AddQuoteToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'userAddress', type: 'address' },
      { indexed: false, internalType: 'address payable', name: 'relayerAddress', type: 'address' },
      { indexed: false, internalType: 'bytes', name: 'functionSignature', type: 'bytes' },
    ],
    name: 'MetaTransactionExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'offerId', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'seller', type: 'address' },
      { indexed: true, internalType: 'address', name: 'buyer', type: 'address' },
      { indexed: false, internalType: 'address', name: 'nftAddress', type: 'address' },
      { indexed: false, internalType: 'address', name: 'quoteToken', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'nftId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'offerPrice', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'quantity', type: 'uint256' },
    ],
    name: 'OfferExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'asset', type: 'address' },
      { indexed: false, internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'RemoveQuoteToken',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'saleId', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'seller', type: 'address' },
      { indexed: true, internalType: 'address', name: 'buyer', type: 'address' },
      { indexed: false, internalType: 'address', name: 'nftAddress', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'nftId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'quantity', type: 'uint256' },
    ],
    name: 'SellExecuted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ERC721InterfaceID',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_asset', type: 'address' }],
    name: 'addQuoteToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'allowedQuoteTokens',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'userAddress', type: 'address' },
      { internalType: 'bytes', name: 'functionSignature', type: 'bytes' },
      { internalType: 'bytes32', name: 'sigR', type: 'bytes32' },
      { internalType: 'bytes32', name: 'sigS', type: 'bytes32' },
      { internalType: 'uint8', name: 'sigV', type: 'uint8' },
    ],
    name: 'executeMetaTransaction',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256[4]', name: 'uints', type: 'uint256[4]' },
      { internalType: 'address[]', name: 'addrs', type: 'address[]' },
      { internalType: 'bytes[2]', name: 'sigs', type: 'bytes[2]' },
      { internalType: 'bytes32', name: 'offerId', type: 'bytes32' },
    ],
    name: 'executeOffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256[3]', name: 'uints', type: 'uint256[3]' },
      { internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
      { internalType: 'bytes[2]', name: 'sigs', type: 'bytes[2]' },
      { internalType: 'bytes32', name: 'sellId', type: 'bytes32' },
    ],
    name: 'executeSell',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getNonce',
    outputs: [{ internalType: 'uint256', name: 'nonce', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
    name: 'isAllowedQuoteToken',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_asset', type: 'address' }],
    name: 'removeQuoteToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const testnetmarketAddress = '0x74c77F20B2c8C5E4f0E8a7491b8d49c8aa43c644'
const mainnetmarketAddress = '0x74c77F20B2c8C5E4f0E8a7491b8d49c8aa43c644'

export const marketAddress =
  environment === 'production' ? mainnetmarketAddress : testnetmarketAddress
