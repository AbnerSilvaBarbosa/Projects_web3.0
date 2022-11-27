// contract test code will go here

// npm i mocha ganache-cli web3

const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3(ganache.provider())

// interface and bytecode of contract
const {abi, evm} = require('../compile')

let accounts;
let Inbox;

beforeEach(async ()=>{
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy the contract
    Inbox = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object, arguments: ['Hi there!']})
    .send({from: accounts[0] , gas: '1000000'})
})

describe("Inbox",()=>{
    it('deploys a contract',()=>{
        assert.ok(Inbox.options.address)
    })

    it('has a default message', async () => {
        const message =  await Inbox.methods.message().call()
        assert.equal(message,'Hi there!')
    })

    it('can change the message', async ()=>{
        await Inbox.methods.setMessage('New message').send({from: accounts[0]})
        const message =  await Inbox.methods.message().call()

        assert.equal(message,'New message')
    })
})










// class Car {
//     park() {
//         return 'stopped'
//     }

//     drive() {
//         return 'vroom'
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// })

// describe('Car Class', () => {
//     it('Can park', () => {
//         assert.equal(car.park(), 'stopped');
//     })

//     it('Can drive', () => {
//         assert.equal(car.drive(), 'vroom')
//     })
// })