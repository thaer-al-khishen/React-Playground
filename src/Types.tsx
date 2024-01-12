import App from "./App";

export {}

function TestTypes() {
    return greet({ name: "Alice", age: 25 });
}

let name: string = "John Doe";
let age: number = 30;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3];
// or using generic array type
// let numbers: Array<number> = [1, 2, 3];
let person: [string, number] = ["John", 35]; // Fixed length and types

enum Color {Red, Green, Blue}
let c: Color = Color.Green;

let randomValue: any = 4; // Can be anything
randomValue = "Hello"; // is now a string

function logMessage(): void {
    console.log("This is a message");
}

let u: undefined = undefined;
let n: null = null;

function error(message: string): never {
    throw new Error(message);
}

let user: object = { name: "John", age: 30 };


//Type Assertions
// Type assertions are a way to tell the compiler "trust me, I know what I'm doing." It’s like type casting in other languages.
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;


//2. Interfaces
// Interfaces in TypeScript are used to define the structure of objects.
// They are a powerful way to define contracts within your code and contracts with code outside of your project.
interface User {
    name: string;
    age: number;
    isActive?: boolean; // Optional property
}

function greet(user: User) {
    console.log("Hello, " + user.name);
}

greet({ name: "Alice", age: 25 }); // OK
// greet({ name: "Bob" }); // Error, 'age' is missing


//Generics
//Generics provide a way to create reusable components. They create a component that can work over a variety of types rather than a single one.
// Generic Function:
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

export default TestTypes;
