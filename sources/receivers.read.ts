import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { ReceiversContract } from "./output/sample_ReceiversContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let testnet = true;
    let packageName = "sample_ReceiversContract.pkg";
    let owner = Address.parse("0QD91KPvrbvonBK5fgJn06gc6tGYNy1B5K5ItAXssYwwje2o");
    let init = await ReceiversContract.init(owner);
    let contract_address = contractAddress(0, init);

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);
    console.log(contract_address.toString({ testOnly: true }));

    // Input the contract address
    let contract = await ReceiversContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("value is: " + (await contract_open.getValue()));
})();
