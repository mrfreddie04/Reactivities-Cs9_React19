import { makeAutoObservable } from 'mobx';	

export class CounterStore {
  title: string = 'Counter store';
  count: number = 42;
  events: string[] = [
    `Initial count is ${this.count}`
  ];

  constructor() {
    makeAutoObservable(this);    
  }
  
  increment = (amount: number = 1) => {
    this.count += amount;
    this.events.push(`Incremented by ${amount} - count is now ${this.count}`);
  }
  
  decrement = (amount: number = 1) => {
    this.count -= amount;
    this.events.push(`Decremented by ${amount} - count is now ${this.count}`);
  } 
  
  get eventCount() {
    return this.events.length;
  }
};