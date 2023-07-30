import { useConnection,useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import { FC } from 'react';
import styles from '../styles/Home.module.css';

const PROGRAM_ID = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PROGRAM_DATA_ADDRESS = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");


export const PingButton: FC = () => {

      const { connection } = useConnection();
      const { publicKey, sendTransaction } = useWallet();

    const onClick = () => {
      
      if (!connection||!publicKey) {
          alert("please connect your wallet first!");
          return
      }

      const transaction = new web3.Transaction(); 
      const instruction = new web3.TransactionInstruction({
        keys: [
          {
            pubkey : PROGRAM_DATA_ADDRESS,
            isSigner : false,
            isWritable : true,
          },
        ],
        programId: PROGRAM_ID,
      });//const instruction

      transaction.add(instruction);
      sendTransaction(transaction,connection).then(sig => {
          console.log(sig);
          //console.log('Explorer URL: https://explorer.solana.com/tx/${sig}?cluster=devnet'); 
      })
    };//onClick

    return (
        <div className={styles.buttonContainer} onClick={onClick}>
            <button className={styles.button}>Ping!</button>
        </div>

    );
}//PingButton

