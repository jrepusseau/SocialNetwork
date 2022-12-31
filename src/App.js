import moment from 'moment'
import logo from './favicon144.png'
import React, { useState } from 'react'
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/normalize.css/normalize.css";
import {RadioGroup, Radio} from "@blueprintjs/core";
import {
    Address,
    BaseAddress,
    MultiAsset,
    Assets,
    ScriptHash,
    Costmdls,
    Language,
    CostModel,
    AssetName,
    TransactionUnspentOutput,
    TransactionUnspentOutputs,
    TransactionOutput,
    Value,
    TransactionBuilder,
    TransactionBuilderConfigBuilder,
    TransactionOutputBuilder,
    LinearFee,
    BigNum,
    BigInt,
    TransactionHash,
    TransactionInputs,
    TransactionInput,
    TransactionWitnessSet,
    Transaction,
    PlutusData,
    PlutusScripts,
    PlutusScript,
    PlutusList,
    Redeemers,
    Redeemer,
    RedeemerTag,
    Ed25519KeyHashes,
    ConstrPlutusData,
    ExUnits,
    Int,
    NetworkInfo,
    EnterpriseAddress,
    TransactionOutputs,
    hash_transaction,
    hash_script_data,
    hash_plutus_data,
    ScriptDataHash, Ed25519KeyHash, NativeScript, StakeCredential,
    MetadataMap,
    TransactionMetadatum,
    TransactionMetadatumLabels,
        MetadataList,   
    AuxiliaryData,
    GeneralTransactionMetadata,
    MetadataJsonSchema
} from "@emurgo/cardano-serialization-lib-asmjs"
import "./App.css";
import {blake2b} from "blakejs";
let Buffer = require('buffer/').Buffer
let blake = require('blakejs')
var assetList = []; 
var assetListHex = []; 
var policyList = []; 

var f=0; 
const preprod  = "preprodNxKB4zxUHzlHB7SE8CiYxWXe9qg1I67T" 
const mainnet = "mainnetfXjRIYdCo4FNIxJ15AgCSxLxjLLxZPag"
var tweets=[]; 
var tweetsIni =[];
var cli =[]; 
var tweetIndex;
var replyThread, replyMsg, replyImage; 
var replyTo, replyToUser, replyCreated, sbl; 
var stateReply; 
var threads = [];
var tweetsmap =[];
var userTable = []; 
var messageList; 
var messages=[]; 
var likeCounter = []; 


var networkType ="mainnet"
var networkProject = mainnet
var networkCexplorer = ""
var statusLoad; 

function returnTxInfo(ctx)
{
  var replyTo, twThread; 
  
    var xhp= new XMLHttpRequest();  // Transaction 3
   xhp.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/txs/'+ctx+'/metadata', false );
   xhp.setRequestHeader("project_id", networkProject);
    xhp.send( null );
              var d3 = xhp.responseText

   var xht= new XMLHttpRequest();  // Transaction 3
   xht.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/txs/'+ctx+'/utxos', false );
   xht.setRequestHeader("project_id", networkProject);
    xht.send( null );
              var d4 = JSON.parse(xht.responseText)
      
            var ad = d4.inputs[0].address ; 
          
              
              
                var xt= new XMLHttpRequest();  // Transaction 3
   xt.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/addresses/'+ad, false );
   xt.setRequestHeader("project_id", networkProject);
    xt.send( null );
              var d5 = JSON.parse(xt.responseText)
              var stakeAd = d5.stake_address;
         
              try{
var ct = JSON.parse(d3.substring(1).slice(0,-1));}
catch{ct=""}
try{
var username = ct.json_metadata.profile.username;
var profile = {
    user: stakeAd, 
    username: username
} 
var username = ct.json_metadata.profile.username;
console.log(userTable); 
}
catch{};
try{
    var msg =ct.json_metadata.msg;
  var fullmsg = msg.join('')
   // console.log(label);


            
  
  
 var xpd= new XMLHttpRequest();
    xpd.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/txs/'+ctx, false ); // false for synchronous request
  xpd.setRequestHeader("project_id", networkProject);
    xpd.send( null );
        var d2 = JSON.parse(xpd.responseText)
var unixTime2 = d2.block_time*1000;
 try{
   replyTo = ct.json_metadata.replyTo
 }
 catch 
     {replyTo = undefined}
     try{
        twThread = ct.json_metadata.thread
      }
      catch 
          {}
      
      
       if (twThread == undefined)
         twThread = ctx;         
  
   

              
      
  
  if(stakeAd!=null)
  {
  var data = {
    "user":stakeAd,
  "tx": ctx,
    "thread":twThread, 
    "replyTo":replyTo, 
    "msg":fullmsg,
    "createdOn":unixTime2
};

    tweetsIni.push(data);
  
              }
              }
  catch{}

}



function returnTxInfoEdit(ctx)
{
  var msg,replyTo,fullmsg,twThread;
  
    var xhp= new XMLHttpRequest();  // Transaction 3
   xhp.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/txs/'+ctx+'/metadata', false );
   xhp.setRequestHeader("project_id", networkProject);
    xhp.send( null );
              var d3 = xhp.responseText

              var xht= new XMLHttpRequest();  // Transaction 3
              xht.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/txs/'+ctx+'/utxos', false );
              xht.setRequestHeader("project_id", networkProject);
               xht.send( null );
                         var d4 = JSON.parse(xht.responseText)
                 
                       var ad = d4.inputs[0].address ;            

               
              var xt= new XMLHttpRequest();  // Transaction 3
              xt.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/addresses/'+ad, false );
              xt.setRequestHeader("project_id", networkProject);
               xt.send( null );
                         var d5 = JSON.parse(xt.responseText)
                         var stakeAd = d5.stake_address;

                         var xpd= new XMLHttpRequest();
                         xpd.open( "GET",'https://cardano-'+networkType+'.blockfrost.io/api/v0/txs/'+ctx, false ); // false for synchronous request
                       xpd.setRequestHeader("project_id", networkProject);
                         xpd.send( null );
                             var d2 = JSON.parse(xpd.responseText)
                     var unixTime2 = d2.block_time;
                     console.log(unixTime2);
       try{
var ct = JSON.parse(d3.substring(1).slice(0,-1));
                
try
{
    let username, image
    try{ username= ct.json_metadata.profile.username;}catch{};
    try{ image= ct.json_metadata.profile.image;}catch{};
if (username||image)
var profile =
{
    user:stakeAd,
    username: username, 
    image: image, 
    created:unixTime2,
    tx:ctx,

}
postP(profile);
}
catch{}



                try{  msg=ct.json_metadata.msg;
               
   
 fullmsg = msg.join('')}
                catch{fullmsg=""}
   // console.log(label);

 console.log(fullmsg);
                
               
  

 try{
   replyTo = ct.json_metadata.replyTo
 }
 catch 
     {}
 
     try{
        twThread = ct.json_metadata.thread
      }
      catch 
          {}
      
      
       if (twThread == undefined)
         twThread = ctx;         
  
   

              
  

 
  var data = {
  "tx": ctx,
    "thread":twThread, 
    "replyTo":replyTo, 
    "msg":fullmsg,
    "createdOn":unixTime2,
    "user":stakeAd
};
         postF(data)


    messages.push(data);

            
              }
  catch(err){
    try{
        console.log(err);
        var ct = JSON.parse(d3);
        var data = {
            "tx": ctx,
              "createdOn":unixTime2,
              "user":stakeAd
          };
                postF(data)
      }
      catch(err)
      {
        alert('another issue')
      }
    }


 




  console.log(messages);
  

}

function postF (data)
{
  var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
  xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});
    xhr.open("POST", "https://login-4c63.restdb.io/rest/tweetdb");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6329be59bf647d0a5c1985b4");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(JSON.stringify(data));





    }
  

    function postP(data)
    {
      var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
      xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
        xhr.open("POST", "https://login-4c63.restdb.io/rest/client");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6329be59bf647d0a5c1985b4");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(JSON.stringify(data));
        }
      




export default class App extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            selectedTabId: "1",
            whichWalletSelected: undefined,
            walletFound: false,
            walletIsEnabled: false,
            walletName: undefined,
            walletIcon: undefined,
            walletAPIVersion: undefined,
            wallets: [],

            networkId: undefined,
            Utxos: undefined,
            CollatUtxos: undefined,
            balance: undefined,
            changeAddress: undefined,
            rewardAddress: undefined,
            usedAddress: undefined,

            txBody: undefined,
            txBodyCborHex_unsigned: "",
            txBodyCborHex_signed: "",
            submittedTxHash: "",

            addressBech32SendADA: "addr_test1qrt7j04dtk4hfjq036r2nfewt59q8zpa69ax88utyr6es2ar72l7vd6evxct69wcje5cs25ze4qeshejy828h30zkydsu4yrmm",
            lovelaceToSend: 1000000,
            transferQuantity: 100, 
            assetNameHex: "4c494645",
            assetPolicyIdHex: "ae02017105527c6c0c9840397a39cc5ca39fabe5b9998ba70fda5f2f",
            assetAmountToSend: 5,
            addressScriptBech32: "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8",
            datumStr: "12345678",
            plutusScriptCborHex: "4e4d01000033222220051200120011",
            transactionIdLocked: "",
            transactionIndxLocked: 0,
            lovelaceLocked: 3000000,
            manualFee: 900000,

            batch:"X12345678"

        }

        /**
         * When the wallet is connect it returns the connector which is
         * written to this API variable and all the other operations
         * run using this API object
         */
        this.API = undefined;

        /**
         * Protocol parameters
         * @type {{
         * keyDeposit: string,
         * coinsPerUtxoWord: string,
         * minUtxo: string,
         * poolDeposit: string,
         * maxTxSize: number,
         * priceMem: number,
         * maxValSize: number,
         * linearFee: {minFeeB: string, minFeeA: string}, priceStep: number
         * }}
         */
        this.protocolParams = {
            linearFee: {
                minFeeA: "44",
                minFeeB: "155381",
            },
            minUtxo: "34482",
            poolDeposit: "500000000",
            keyDeposit: "2000000",
            maxValSize: 5000,
            maxTxSize: 16384,
            priceMem: 0.0577,
            priceStep: 0.0000721,
            coinsPerUtxoWord: "34482",
        }

        this.pollWallets = this.pollWallets.bind(this);
    }

    /**
     * Poll the wallets it can read from the browser.
     * Sometimes the html document loads before the browser initialized browser plugins (like Nami or Flint).
     * So we try to poll the wallets 3 times (with 1 second in between each try).
     *
     * Note: CCVault and Eternl are the same wallet, Eternl is a rebrand of CCVault
     * So both of these wallets as the Eternl injects itself twice to maintain
     * backward compatibility
     *
     * @param count The current try count.
     */
    pollWallets = (count = 0) => {
        const wallets = [];
        for(const key in window.cardano) {
            if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
                wallets.push(key);
            }
        }
        if (wallets.length === 0 && count < 3) {
            setTimeout(() => {
                this.pollWallets(count + 1);
            }, 1000);
            return;
        }
        this.setState({
            wallets,
            whichWalletSelected: wallets[0]
        }, () => {
            this.refreshData()
        });
    }

    /**
     * Handles the tab selection on the user form
     * @param tabId
     */
    handleTabId = (tabId) => this.setState({selectedTabId: tabId})

    /**
     * Handles the radio buttons on the form that
     * let the user choose which wallet to work with
     * @param obj
     */
    handleWalletSelect = (obj) => {
        const whichWalletSelected = obj.target.value
        this.setState({whichWalletSelected},
            () => {
                this.refreshData()
            })
    }

    /**
     * Generate address from the plutus contract cborhex
     */
    generateScriptAddress = () => {
        // cborhex of the alwayssucceeds.plutus
        // const cborhex = "4e4d01000033222220051200120011";
        // const cbor = Buffer.from(cborhex, "hex");
        // const blake2bhash = blake.blake2b(cbor, 0, 28);

        const script = PlutusScript.from_bytes(Buffer.from(this.state.plutusScriptCborHex, "hex"))
        // const blake2bhash = blake.blake2b(script.to_bytes(), 0, 28);
        const blake2bhash = "67f33146617a5e61936081db3b2117cbf59bd2123748f58ac9678656";
        const scripthash = ScriptHash.from_bytes(Buffer.from(blake2bhash,"hex"));

        const cred = StakeCredential.from_scripthash(scripthash);
        const networkId = NetworkInfo.testnet().network_id();
        const baseAddr = EnterpriseAddress.new(networkId, cred);
        const addr = baseAddr.to_address();
        const addrBech32 = addr.to_bech32();

        // hash of the address generated from script
        console.log(Buffer.from(addr.to_bytes(), "utf8").toString("hex"))

        // hash of the address generated using cardano-cli
        const ScriptAddress = Address.from_bech32("addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8");
        console.log(Buffer.from(ScriptAddress.to_bytes(), "utf8").toString("hex"))


        console.log(ScriptAddress.to_bech32())
        console.log(addrBech32)

    }

    /**
     * Checks if the wallet is running in the browser
     * Does this for Nami, Eternl and Flint wallets
     * @returns {boolean}
     */

    checkIfWalletFound = () => {
        const walletKey = this.state.whichWalletSelected;
        const walletFound = !!window?.cardano?.[walletKey];
        this.setState({walletFound})
        return walletFound;
    }

    /**
     * Checks if a connection has been established with
     * the wallet
     * @returns {Promise<boolean>}
     */
    checkIfWalletEnabled = async () => {
        let walletIsEnabled = false;

        try {
            const walletName = this.state.whichWalletSelected;
            walletIsEnabled = await window.cardano[walletName].isEnabled();
        } catch (err) {
            console.log(err)
        }
        this.setState({walletIsEnabled});

        return walletIsEnabled;
    }

    /**
     * Enables the wallet that was chosen by the user
     * When this executes the user should get a window pop-up
     * from the wallet asking to approve the connection
     * of this app to the wallet
     * @returns {Promise<boolean>}
     */

    enableWallet = async () => {
        const walletKey = this.state.whichWalletSelected;
        try {
            this.API = await window.cardano[walletKey].enable();
        } catch(err) {
            console.log(err);
        }
        return this.checkIfWalletEnabled();
    }

    /**
     * Get the API version used by the wallets
     * writes the value to state
     * @returns {*}
     */
    getAPIVersion = () => {
        const walletKey = this.state.whichWalletSelected;
        const walletAPIVersion = window?.cardano?.[walletKey].apiVersion;
        this.setState({walletAPIVersion})
        return walletAPIVersion;
    }

    /**
     * Get the name of the wallet (nami, eternl, flint)
     * and store the name in the state
     * @returns {*}
     */

    getWalletName = () => {
        const walletKey = this.state.whichWalletSelected;
        const walletName = window?.cardano?.[walletKey].name;
        this.setState({walletName})
        return walletName;
    }

    /**
     * Gets the Network ID to which the wallet is connected
     * 0 = testnet
     * 1 = mainnet
     * Then writes either 0 or 1 to state
     * @returns {Promise<void>}
     */
    getNetworkId = async () => {
        try {
            const networkId = await this.API.getNetworkId();
            this.setState({networkId})

        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Gets the UTXOs from the user's wallet and then
     * stores in an object in the state
     * @returns {Promise<void>}
     */

    getUtxos = async () => {

        let Utxos = [];

        try {
            const rawUtxos = await this.API.getUtxos();

            for (const rawUtxo of rawUtxos) {
                const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(rawUtxo, "hex"));
                const input = utxo.input();
                const txid = Buffer.from(input.transaction_id().to_bytes(), "utf8").toString("hex");
                const txindx = input.index();
                const output = utxo.output();
                const amount = output.amount().coin().to_str(); // ADA amount in lovelace
                const multiasset = output.amount().multiasset();
                let multiAssetStr = "";

                if (multiasset) {
                    const keys = multiasset.keys() // policy Ids of thee multiasset
                    const N = keys.len();
                    // console.log(`${N} Multiassets in the UTXO`)


                    for (let i = 0; i < N; i++){
                        const policyId = keys.get(i);
                        const policyIdHex = Buffer.from(policyId.to_bytes(), "utf8").toString("hex");
                        // console.log(`policyId: ${policyIdHex}`)
                        const assets = multiasset.get(policyId)
                        const assetNames = assets.keys();
                        const K = assetNames.len()
                        // console.log(`${K} Assets in the Multiasset`)

                        for (let j = 0; j < K; j++) {
                            const assetName = assetNames.get(j);
                            const assetNameString = Buffer.from(assetName.name(),"utf8").toString();
                            const assetNameHex = Buffer.from(assetName.name(),"utf8").toString("hex")
                            const multiassetAmt = multiasset.get_asset(policyId, assetName)
                            multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`
                            // console.log(assetNameString)
                            // console.log(`Asset Name: ${assetNameHex}`)
                            assetList.push(assetNameString);
                            assetListHex.push(assetNameHex);
                            policyList.push(policyIdHex);
                        }
                    }
                }


                const obj = {
                    txid: txid,
                    txindx: txindx,
                    amount: amount,
                    str: `${txid} #${txindx} = ${amount}`,
                    multiAssetStr: multiAssetStr,
                    TransactionUnspentOutput: utxo
                }
                Utxos.push(obj);
                // console.log(`utxo: ${str}`)
            }
            this.setState({Utxos})
        } catch (err) {
            console.log(err)
        }
    }

  /* getTokenList = () => {
    
  






    /**
     * The collateral is need for working with Plutus Scripts
     * Essentially you need to provide collateral to pay for fees if the
     * script execution fails after the script has been validated...
     * this should be an uncommon occurrence and would suggest the smart contract
     * would have been incorrectly written.
     * The amount of collateral to use is set in the wallet
     * @returns {Promise<void>}
     */
    getCollateral = async () => {

        let CollatUtxos = [];

        try {

            let collateral = [];

            const wallet = this.state.whichWalletSelected;
            if (wallet === "nami") {
                collateral = await this.API.experimental.getCollateral();
            } else {
                collateral = await this.API.getCollateral();
            }

            for (const x of collateral) {
                const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(x, "hex"));
                CollatUtxos.push(utxo)
                // console.log(utxo)
            }
            this.setState({CollatUtxos})
        } catch (err) {
            console.log(err)
        }

    }

    /**
     * Gets the current balance of in Lovelace in the user's wallet
     * This doesnt resturn the amounts of all other Tokens
     * For other tokens you need to look into the full UTXO list
     * @returns {Promise<void>}
     */
    getBalance = async () => {
        try {
            const balanceCBORHex = await this.API.getBalance();

            const balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex")).coin().to_str();
            this.setState({balance})

        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Get the address from the wallet into which any spare UTXO should be sent
     * as change when building transactions.
     * @returns {Promise<void>}
     */
    getChangeAddress = async () => {
        try {
            const raw = await this.API.getChangeAddress();
            const changeAddress = Address.from_bytes(Buffer.from(raw, "hex")).to_bech32()
            this.setState({changeAddress})
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * This is the Staking address into which rewards from staking get paid into
     * @returns {Promise<void>}
     */
    getRewardAddresses = async () => {

        try {
            const raw = await this.API.getRewardAddresses();
            const rawFirst = raw[0];
            const rewardAddress = Address.from_bytes(Buffer.from(rawFirst, "hex")).to_bech32()
            // console.log(rewardAddress)
            this.setState({rewardAddress})

        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Gets previsouly used addresses
     * @returns {Promise<void>}
     */
    getUsedAddresses = async () => {

        try {
            const raw = await this.API.getUsedAddresses();
            const rawFirst = raw[0];
            const usedAddress = Address.from_bytes(Buffer.from(rawFirst, "hex")).to_bech32()
            // console.log(rewardAddress)
            this.setState({usedAddress})

        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Refresh all the data from the user's wallet
     * @returns {Promise<void>}
     */
    refreshData = async () => {
        this.generateScriptAddress()

        try{
            const walletFound = this.checkIfWalletFound();
            if (walletFound) {
                await this.getAPIVersion();
                await this.getWalletName();
                const walletEnabled = await this.enableWallet();
                if (walletEnabled) {
                    await this.getNetworkId();
                    await this.getUtxos();
                    await this.getCollateral();
                    await this.getBalance();
                    await this.getChangeAddress();
                    await this.getRewardAddresses();
                    await this.getUsedAddresses();
                } else {
                    await this.setState({
                        Utxos: null,
                        CollatUtxos: null,
                        balance: null,
                        changeAddress: null,
                        rewardAddress: null,
                        usedAddress: null,

                        txBody: null,
                        txBodyCborHex_unsigned: "",
                        txBodyCborHex_signed: "",
                        submittedTxHash: "",
                    });
                }
            } else {
                await this.setState({
                    walletIsEnabled: false,

                    Utxos: null,
                    CollatUtxos: null,
                    balance: null,
                    changeAddress: null,
                    rewardAddress: null,
                    usedAddress: null,

                    txBody: null,
                    txBodyCborHex_unsigned: "",
                    txBodyCborHex_signed: "",
                    submittedTxHash: "",
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Every transaction starts with initializing the
     * TransactionBuilder and setting the protocol parameters
     * This is boilerplate
     * @returns {Promise<TransactionBuilder>}
     */
    initTransactionBuilder = async () => {

        const txBuilder = TransactionBuilder.new(
            TransactionBuilderConfigBuilder.new()
                .fee_algo(LinearFee.new(BigNum.from_str(this.protocolParams.linearFee.minFeeA), BigNum.from_str(this.protocolParams.linearFee.minFeeB)))
                .pool_deposit(BigNum.from_str(this.protocolParams.poolDeposit))
                .key_deposit(BigNum.from_str(this.protocolParams.keyDeposit))
                .coins_per_utxo_word(BigNum.from_str(this.protocolParams.coinsPerUtxoWord))
                .max_value_size(this.protocolParams.maxValSize)
                .max_tx_size(this.protocolParams.maxTxSize)
                .prefer_pure_change(true)
                .build()
        );

        return txBuilder
    }

    /**
     * Builds an object with all the UTXOs from the user's wallet
     * @returns {Promise<TransactionUnspentOutputs>}
     */
    getTxUnspentOutputs = async () => {
        let txOutputs = TransactionUnspentOutputs.new()
        for (const utxo of this.state.Utxos) {
            txOutputs.add(utxo.TransactionUnspentOutput)
        }
        return txOutputs
    }

    /**
     * The transaction is build in 3 stages:
     * 1 - initialize the Transaction Builder
     * 2 - Add inputs and outputs
     * 3 - Calculate the fee and how much change needs to be given
     * 4 - Build the transaction body
     * 5 - Sign it (at this point the user will be prompted for
     * a password in his wallet)
     * 6 - Send the transaction
     * @returns {Promise<void>}
     */
    buildSendADATransaction = async () => {

       
   let like; 
      let m = document.getElementById("tweetArea")
      var resm = m.value


/*let tech = document.getElementById('heart').innerText
if (tech=="❤️")
 like=1; 
else*/
like=0; 


      
var ty = resm.match(/.{1,64}/g);
console.log(ty)

const tags= MetadataList.new()


/*
ty.forEach(function(number) {
    tags.add(TransactionMetadatum.new_text(number));
});*/ 

        const txBuilder = await this.initTransactionBuilder();
        //const shelleyOutputAddress = Address.from_bech32(this.state.changeAddress);
        const shelleyOutputAddress = Address.from_bech32(this.state.changeAddress);
        const shelleyChangeAddress = Address.from_bech32(this.state.changeAddress);

        txBuilder.add_output(
            TransactionOutput.new(
                shelleyOutputAddress,
                Value.new(BigNum.from_str(this.state.lovelaceToSend.toString()))
            ),
        );


/*
        const map = MetadataMap.new();
        map.insert(
            TransactionMetadatum.new_text("msg"),
           // TransactionMetadatum.new_text("resm")
           TransactionMetadatum.new_list(tags),
          );

          const metadatum = TransactionMetadatum.new_map(map); */ 
var obj='';
        if (ty)
        {
          obj = {
            replyTo: replyTo ,
            thread: replyThread ,
            msg: ty,
            like:like
          };
        }
        else 
        {
         obj = {
              replyTo: replyTo ,
              thread: replyThread ,
              like:like
            };
          }



           txBuilder.add_json_metadatum(
                BigNum.from_str("94"),
                JSON.stringify(obj)
            );



        




          
                

        // Find the available UTXOs in the wallet and
        // us them as Inputs
        const txUnspentOutputs = await this.getTxUnspentOutputs();
        txBuilder.add_inputs_from(txUnspentOutputs, 1)
        // calculate the min fee required and send any change to an address
        txBuilder.add_change_if_needed(shelleyChangeAddress)

        // once the transaction is ready, we build it to get the tx body without witnesses
        const txBody = txBuilder.build();

        const unsignedTransaction = txBuilder.build_tx();

        // Tx witness
        const transactionWitnessSet = TransactionWitnessSet.new();

        const tx = Transaction.new(
            txBody,
            TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes()),
         //  AuxiliaryData.from_bytes(metadatum2.to_bytes())
         unsignedTransaction.auxiliary_data()
        )
        let txVkeyWitnesses
        try{
         txVkeyWitnesses = await this.API.signTx(Buffer.from(tx.to_bytes(), "utf8").toString("hex"), true);


         txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, "hex"));

         transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());
 
         const signedTx = Transaction.new(
             tx.body(),
             transactionWitnessSet,
          //   AuxiliaryData.from_bytes(metadatum2.to_bytes())
          unsignedTransaction.auxiliary_data()
 
         );
 
 
         const submittedTxHash = await this.API.submitTx(Buffer.from(signedTx.to_bytes(), "utf8").toString("hex"));
         alert(submittedTxHash);
         this.setState({submittedTxHash})

         if(submittedTxHash)
         document.getElementById("tweetArea").value="";
         this.deleteThread();
 
        
        }
        catch(err){
alert(err)
        }
      //  console.log(txVkeyWitnesses)

      

    }

    updateProfile = async () => {

       
   
        let username = document.getElementById("username").value
        let image = document.getElementById("image").value

   
  
  
  
          const txBuilder = await this.initTransactionBuilder();
          //const shelleyOutputAddress = Address.from_bech32(this.state.changeAddress);
          const shelleyOutputAddress = Address.from_bech32(this.state.changeAddress);
          const shelleyChangeAddress = Address.from_bech32(this.state.changeAddress);
  
          txBuilder.add_output(
              TransactionOutput.new(
                  shelleyOutputAddress,
                  Value.new(BigNum.from_str(this.state.lovelaceToSend.toString()))
              ),
          );
  
        
  
          
            const obj = {
               profile:
               {
                 username: username,
                 image: image
               }
            };
  
  
  
             txBuilder.add_json_metadatum(
                  BigNum.from_str("94"),
                  JSON.stringify(obj)
              );
  
  
  
  
  
  
            
                  
  
          // Find the available UTXOs in the wallet and
          // us them as Inputs
          const txUnspentOutputs = await this.getTxUnspentOutputs();
          txBuilder.add_inputs_from(txUnspentOutputs, 1)
          // calculate the min fee required and send any change to an address
          txBuilder.add_change_if_needed(shelleyChangeAddress)
  
          // once the transaction is ready, we build it to get the tx body without witnesses
          const txBody = txBuilder.build();
  
          const unsignedTransaction = txBuilder.build_tx();
  
          // Tx witness
          const transactionWitnessSet = TransactionWitnessSet.new();
  
          const tx = Transaction.new(
              txBody,
              TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes()),
           //  AuxiliaryData.from_bytes(metadatum2.to_bytes())
           unsignedTransaction.auxiliary_data()
          )
  
          let txVkeyWitnesses
          try{
           txVkeyWitnesses = await this.API.signTx(Buffer.from(tx.to_bytes(), "utf8").toString("hex"), true);
          }
          catch(err){
alert(err)
          }
          //console.log(txVkeyWitnesses)
  
          txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, "hex"));
  
          transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());
  
          const signedTx = Transaction.new(
              tx.body(),
              transactionWitnessSet,
           //   AuxiliaryData.from_bytes(metadatum2.to_bytes())
           unsignedTransaction.auxiliary_data()
  
          );
  
  try
  {
          const submittedTxHash = await this.API.submitTx(Buffer.from(signedTx.to_bytes(), "utf8").toString("hex"));
          this.setState({submittedTxHash})
  }
  catch(err)
  {
    alert(err)
  }
  
      }


    handleSubmit = async(content) => {  
       /* content=document.getElementById("tweetArea").value;
        var newTweet = {     
             content,      
             id: "nanoid()",     
              created_on: Date(Date.now()),
              user: "me",     
               comments_count: 0,      
               retweets_count: 0,      
               favorites_count: 0,    
            
            }
            tweets.push(newTweet);
            console.log(newTweet);
            this.forceUpdate(); */


            this.buildSendADATransaction();
          
            
        }

          handleReply = async(e, thr, rep, usrn, msg, tm, img, tsbl) =>
          {
              replyThread= thr; 
              console.log(thr)
              replyTo= rep; 
              console.log(replyTo)
              replyToUser = usrn;
              replyMsg= msg;  
              replyCreated = tm; 
              replyImage = img; 
              sbl = tsbl; 
              stateReply = true; 
              console.log(img);
              this.forceUpdate();

          }

 decodeUser(x)
{
    let a,b;
    try{
    a= userTable.filter(function(userTable){ return userTable.username == x });
    b=a[0].user
}
catch{
    b = "Anonymous";
}
    return b
  
}

codeUser(x)
{
    let a,b;
    try{
    a= userTable.filter(function(userTable){ return userTable.user == x });
    b=a[0].username
    if(b==" ")
    b = "Anonymous"
}
catch{
    b = "Anonymous";
}
    return b 
  
}




compare = async() =>
{
    var cliUsername=""; 
    tweetsIni =[];
 tweets = [];
 threads = [];
 tweetsmap =[];
  
   var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
 
   xhr.open("GET", 'https://login-4c63.restdb.io/rest/tweetdb?q={}&sort=createdOn&dir=1', false);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("x-apikey", "6329be59bf647d0a5c1985b4");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send()

            tweetsIni=JSON.parse(xhr.responseText)


            var xhv = new XMLHttpRequest();
            xhv.withCredentials = false;
            xhv.open("GET", 'https://login-4c63.restdb.io/rest/client?q={}&sort=created&dir=-1', false);
            xhv.setRequestHeader("content-type", "application/json");
            xhv.setRequestHeader("x-apikey", "6329be59bf647d0a5c1985b4");
            xhv.setRequestHeader("cache-control", "no-cache");
            xhv.send()

            userTable=JSON.parse(xhv.responseText)
         

              
        cli = 
        [{
            username: "user0",
            user: "stake1u8ps3x77guh48e6v3v53yn8yk5xzxw4pj827sfutqh6zsxg2kuct8"
        },
        {
        username:"walletZorg", 
        user:"stake_test1upk88mp3yy05x6xwcp7cyxh6rew4alt2ddmeu637vu0taegk3pz9v"
        }, 
        {
            username:"JennyCrazyRich", 
            user:"stake_test1uph9cg8edan252wv2vf203dmhecvn6uglq5ve2phzmyxpjq3pxjjc"
        }];
        
        
        
        
                       // cli = JSON.parse(client);
                        //answ = JSON.parse(answer);
        
                       tweetsIni.forEach( answer => 
                        {

                            let thread; 
                           if (answer.user);
                            cliUsername= this.codeUser(answer.user);
                           

                            if (answer.msg)
                            {
                            console.log(answer)
        
                            if(answer.thread)
                            {
                              thread = answer.thread
                            }
                            else
                            thread = answer.tx; 

                             
                            var newTweet = {     
                                msg:  answer.msg,
                                id: answer.tx,     
                                 created_on: parseInt(answer.createdOn)*1000,
                                 username: cliUsername,  
                                 user: answer.user,  
                                 thread: thread,
                                 replyTo: answer.replyTo , 
                                 like: answer.like 
                               }
                              tweets.push(newTweet);
                              if(newTweet.id == newTweet.thread)
                              threads.push(newTweet.id); 
                            }
                        })
                        console.log("here the tweets:")
                          
        console.log(tweets)
        console.log("here the threads:")

        console.log(threads) ;
        threads = threads.reverse(); 
            

        threads.forEach(thread => 
            {
                var buffer = [] ;
                tweets.forEach(tweet => 
                    {
                      if(thread == tweet.thread) 
                         buffer.push(tweet)
                    }
                    )
                tweetsmap.push(buffer)

            }
            
            
            
            )

            console.log(tweetsmap)

//Load likes

         tweetsmap.forEach((tm,index) =>
                {
                    let count = 0; 
                   tm.forEach((tw) => 
                    {
                      if (tw.like == 1)
                        count+=1;   
            console.log(tw.username)
            console.log(new Date(tw.created_on).toLocaleString('en-US'))
             console.log(tw.msg)
      
                    })
likeCounter[index]= count;          
        })
  
        this.forceUpdate();
                    }

          
        





        
        
         start()
        {
        var xmp = new XMLHttpRequest();
        xmp.open("GET", 'https://cardano-'+networkType+'.blockfrost.io/api/v0/metadata/txs/labels/94', false); // false for synchronous request
        xmp.setRequestHeader("project_id", networkProject);
        xmp.send();
        var content2 = JSON.parse(xmp.responseText);
          console.log(xmp.responseText)
        content2.forEach(content =>
                        {
          this.returnTxInfo(content.tx_hash)
         
        }) ;
        console.log(tweetsIni);

         /* 
         var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            console.log(this.responseText);
          }
        });
        
        xhr.open("GET", "https://login-4c63.restdb.io/rest/tweetdb");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "6329be59bf647d0a5c1985b4");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send()*/ 
        
        }
        
       
  

        
codeImage(x)
{
    let a,b;
    try{
    a= userTable.filter(function(userTable){ return userTable.user == x });
    b=a[0].image;
}
catch(err){
}
    return b 
  
}










 

   deleteThread(e)
   {
replyThread="";
 replyTo="";
 replyToUser="";
 replyCreated="";
 stateReply=false; 
 this.forceUpdate();
   }



fetch()
{
 
    var xmp = new XMLHttpRequest();
    xmp.open("GET", 'https://cardano-'+networkType+'.blockfrost.io/api/v0/metadata/txs/labels', false); // false for synchronous request
    xmp.setRequestHeader("project_id", networkProject)
    xmp.send();
    var content2 = JSON.parse(xmp.responseText);
      console.log(xmp.responseText)
    
    var data_filter = content2.filter( element => element.label =="94")
    var a = data_filter[0].count;
    console.log(a)
    console.log(tweetsIni.length)


    if (tweetsIni.length<a)
    {
      var d = parseInt(a)-tweetsIni.length;
      console.log(d)
    
      var xmp = new XMLHttpRequest();
      xmp.open("GET", 'https://cardano-'+networkType+'.blockfrost.io/api/v0/metadata/txs/labels/94?order=desc&count='+d, false); // false for synchronous request
      xmp.setRequestHeader("project_id", networkProject);
      xmp.send();
      var content2 = JSON.parse(xmp.responseText);
        console.log(xmp.responseText)
      content2.forEach(content =>
                      {
      //Here function to check if the Tx already exist 
      var xhq = new XMLHttpRequest();
      xhq.withCredentials = false;
      xhq.open("GET", 'https://login-4c63.restdb.io/rest/tweetdb?q={"tx":'+content.tx_hash+'}')
      xhq.setRequestHeader("content-type", "application/json");
      xhq.setRequestHeader("x-apikey", "6329be59bf647d0a5c1985b4");
      xhq.setRequestHeader("cache-control", "no-cache");
      xhq.send()
      
      try{
        let answ=JSON.parse(xhq.responseText)
        console.log(answ)
        if (answ.length==0)
          returnTxInfoEdit(content.tx_hash)
        }
        catch
        {
            returnTxInfoEdit(content.tx_hash)
        }
        }) ;
        }
        

}

avatar(x)
{
   var str = "url(https://image-optimizer.jpgstoreapis.com/"+x+")"
   console.log(str)
   if(x)
  return(
  <div className="avatar" style={{backgroundImage: str}} ></div>
)
}

toggleHeart(e)
{
   /* let tech = document.getElementById('heart').innerText; 
    if (tech=="♡")
    document.getElementById('heart').innerText="❤️"
    else 
    document.getElementById('heart').innerText ="♡"
    this.forceUpdate()*/
}


chStatus(x)
{
    statusLoad = x; 
    this.forceUpdate();
}



   async componentDidMount() {
        this.pollWallets();
        await this.refreshData();
         this.compare();
       //  this.fetch();
    }

    render()
    {
     

        return (
            <div>
 
           
<div style={{float:'right'}} >  {
    this.avatar(this.codeImage(this.state.rewardAddress))
}
{
    this.state.rewardAddress &&
    <span className="tweet-user">@{this.codeUser(this.state.rewardAddress)}</span>
    }
            <details >
           
    <summary style={{width: 40}}className="button-29">
    {this.state.networkId == 0 &&
        <span>
          switch to mainnet
        </span>
      }
{this.state.networkId == 1 && 
        <span>
          ✓
        </span>
      }
     

    </summary>
    <div style={{paddingTop: "10px"}} className="overlay">
    <div >
                    <p style={{marginBottom: 15}}>Wallet parameters</p>
                    <span style={{fontWeight: "bold"}}>Select Wallet: </span>
                    <RadioGroup
                        onChange={this.handleWalletSelect}
                        selectedValue={this.state.whichWalletSelected}
                        inline={true}
                        className="wallets-wrapper"
                    >
                        { this.state.wallets.map(key =>
                            <Radio
                                key={key}
                                className="wallet-label"
                                value={key}>
                                <img src={window.cardano[key].icon} width={24} height={24} alt={key}/>
                                {window.cardano[key].name} ({key})
                            </Radio>
                        )}
                    </RadioGroup>
                
                <button style={{padding: "10px"}} className="button-8" onClick={this.refreshData}>Refresh</button>
<hr></hr> 
<b> ⚙️ Setup </b> <br></br> 
<p><span style={{fontWeight: "bold"}}>Wallet Connected: </span>{`${this.state.walletIsEnabled}`}</p>
<p><span style={{fontWeight: "bold"}}>Balance: </span>{this.state.balance}
{this.state.balance < 1.3 &&
         <span> Not enough ADA </span>
      }
      {this.state.balance >= 3 &&
          <span> Balance OK </span>
      }
      </p>
<p><span style={{fontWeight: "bold"}}>Connected to: </span>
{this.state.networkId == 0 &&
         <span> Testnet </span>
      }
      {this.state.networkId == 1 &&
          <span> Mainnet </span>
      }
      </p>
     <p><span style={{fontWeight: "bold"}}>MetadataChannel: </span>94</p>
  
     <hr></hr> 
<b> 👤 Profile </b> <br></br> 
<span style={{fontWeight: "bold"}}>New avatar: </span> <input type="text" id="image" placeholder="IPFS"
></input> 
<br></br>

     <span style={{fontWeight: "bold"}}>New username: </span> <input type="text" id="username"></input> 
     <br></br>

      <button className="button-8" onClick={this.updateProfile}>Update</button>
        </div>
        </div>
</details>
</div>

<button id="upbtn" className="button-6" onClick={(e) => {  this.chStatus("Take a few minutes..."); this.fetch(e);this.chStatus("50% completed..");  this.compare(e);this.chStatus("Done!")}}> 
Reload
    </button>
    <p>{statusLoad}</p> 

             
                <div className="main">

                {
            (() => {
               
                    if(stateReply==true) {
                            return (
                                <div className="tweet">   
                                <div className="tweet-header">    
                                {
                      this.avatar(replyImage)
                 }           
                                <span className="tweet-user">@{replyToUser}</span> ·{' '}   
                                <span className="tweet-created-on">{new Date(replyCreated).toLocaleString('en-US')}</span> <br></br>  <br></br>
                                </div>          
                 <div className="tweet-content">{replyMsg}</div> 
                 <a id="heart" style={{fontSize: 'x-large'}} onClick={(e) => this.toggleHeart(e)}>{sbl}</a> {'  '}
                  <a onClick={(e) => this.deleteThread(e)}>X</a>
          </div>
                            )
                        } 
                         else {
                          
                        }
                })()  
            }


            <form className="compose-form" >
               
            <div className="compose-form-container">
              <textarea id="tweetArea"        
                className="compose-form-textarea"
                placeholder="What's happening?"
              />
            </div>

             
        <button type="button" onClick={this.handleSubmit} className="button-17" >
        {
                (() => {
                    if(replyThread) {
                            return (
                                <p>Reply</p>
                            )
                        } 
                         else {
                            return (
                                <p>Post</p>
                            )
                        }
                })()  
            }  
        </button>
          </form>



            <div className="timeline">
          {
            tweetsmap.map((tm ,idx) => 
                <div style={{marginBottom : 10}}> {
                   tm.map((tw, index) => 
                    (
                <div key={tw.id} className="tweet">         
                 <div className="tweet-header">          
                 {
                      this.avatar(this.codeImage(tw.user))
                 }  
                 <span className="tweet-user">@{tw.username}</span> ·{' '}   
                  <span className="tweet-created-on">{new Date(tw.created_on).toLocaleString('en-US')}</span> ·{' '}
                  <a target="_blank" href={'https://cexplorer.io/tx/'+tw.id}>tx</a>    <br></br>  <br></br>   
                 {
                   tw.replyTo &&
                   <span className="tweet-content" style={{color:'blue'}}>Replying to @{this.codeUser(tw.replyTo)}</span>        
                 }      
                 </div>          
                 <div className="tweet-content">{tw.msg}</div>
                 
                 <a style={{fontSize: 'x-large'}} onClick={(e) => this.handleReply(e, tw.thread, tw.user, tw.username, tw.msg, tw.created_on, this.codeImage(tw.user),'♡')}>🔁</a>  {' '}  
                 {
                    (index == 0 ?
                        (<span> {tm.length-1}  <a style={{fontSize: 'x-large'}} onClick={(e) => this.handleReply(e, tw.thread, tw.user, tw.username, tw.msg, tw.created_on, this.codeImage(tw.user),'❤️')}>♡</a> {likeCounter[idx]} </span>):(<span></span>)
                    )
                 }    
           </div>
                    )
                 )
    }
                </div>
        )
        }

            </div>
            </div>
            </div>


           
                              )
    }
}
