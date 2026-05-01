import { sha256 } from 'js-sha256';
import { Block, ParticipationRecord } from '../types';

export class ScholasticBlockchain {
  static calculateHash(index: number, previousHash: string, timestamp: number, data: ParticipationRecord[], nonce: number): string {
    return sha256(index + previousHash + timestamp + JSON.stringify(data) + nonce);
  }

  static createGenesisBlock(): Block {
    const timestamp = Date.now();
    const data: ParticipationRecord[] = [];
    const index = 0;
    const previousHash = "0";
    const nonce = 0;
    const hash = this.calculateHash(index, previousHash, timestamp, data, nonce);
    
    return {
      index,
      timestamp,
      data,
      previousHash,
      hash,
      nonce
    };
  }

  static generateNextBlock(lastBlock: Block, data: ParticipationRecord[]): Block {
    const index = lastBlock.index + 1;
    const previousHash = lastBlock.hash;
    const timestamp = Date.now();
    let nonce = 0;
    let hash = this.calculateHash(index, previousHash, timestamp, data, nonce);

    // Simple Proof of Work (e.g., hash must start with '00')
    // We can disable this for speed or set it very low.
    const difficulty = 1; 
    const target = '0'.repeat(difficulty);

    while (hash.substring(0, difficulty) !== target) {
      nonce++;
      hash = this.calculateHash(index, previousHash, timestamp, data, nonce);
    }

    return {
      index,
      timestamp,
      data,
      previousHash,
      hash,
      nonce
    };
  }

  static isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
    if (previousBlock.index + 1 !== newBlock.index) {
      return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
      return false;
    } else if (this.calculateHash(newBlock.index, newBlock.previousHash, newBlock.timestamp, newBlock.data, newBlock.nonce) !== newBlock.hash) {
      return false;
    }
    return true;
  }
}
