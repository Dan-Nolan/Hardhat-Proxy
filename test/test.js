const { assert } = require("chai");

describe("Protocol", function () {
  let protocol, proxy, proxyAsV1;
  before(async () => {
    const Protocol = await ethers.getContractFactory("Protocol");
    protocol = await Protocol.deploy();
    await protocol.deployed();

    const Proxy = await ethers.getContractFactory("Proxy");
    proxy = await Proxy.deploy(protocol.address);
    await proxy.deployed();

    proxyAsV1 = await ethers.getContractAt("Protocol", proxy.address);

    await proxyAsV1.changeValue(500);
  });

  it("should have changed the value", async function () {
    const value = await proxy.value();
    assert.equal(value.toNumber(), 500);
  });

  describe("we point the proxy to a new protocol", () => {
    let protocolV2, proxyAsV2;
    before(async () => {
      const ProtocolV2 = await ethers.getContractFactory("ProtocolV2");
      protocolV2 = await ProtocolV2.deploy();
      await protocolV2.deployed();

      await proxy.changeAddress(protocolV2.address);

      proxyAsV2 = await ethers.getContractAt("ProtocolV2", proxy.address);

      await proxyAsV2.changeValue(700);
    });

    it("should modify the value in the protocolV2", async () => {
      const value = await proxy.value();
      assert.equal(value.toNumber(), 7000);
    });

    it("should allow us to lookup the new method lookupValueDoubled", async () => {
      const value = await proxyAsV2.lookupValueDoubled();
      assert.equal(value.toNumber(), 14000);
    });
  });
});
