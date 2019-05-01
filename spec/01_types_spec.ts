import * as _ from 'lodash';

describe('variable and constants and stuff', () => {
    it('union a type', () => {
        let x: number | string;

        x = 12;
        x = 'tacos';
    });

    it('declaring and intializing a variable', () => {
        let y = 'tacos';

        let z: string | number = 'red';

    });
    it('constants must be initialized and cannot be reassigned', () => {

        const pi = 3.14;

        const favoriteNumbers = [3, 5, 9, 17];

        favoriteNumbers[2] = 15;

        const movie = {
            title: 'Avengers\: End Game',
            yearReleased: 2018
        };

        movie.yearReleased = 2019;
    });

    it('var is broken because it does not have block scope, it hoists the variable', () => {

        let age = 22;

        if (age > 21) {
            var message = 'Old enough'; //shouldn't work because the variable is only understood within this block, but since it's a 'var' java will hoist it to the beginning as an undeclared variable and then assign the value here
        }

        expect(message).toBe('Old enough');
    });
});

describe('literals', () => {
    it('number literals', () => {
        let z = 99;
        let n1 = 1_000_000;
        expect(1000000).toBe(n1);
        let favColor = 0xff;
        let binary = 0b010101;
        let n3 = 1.2;
    });
    it('string literals', () => {
        // no difference between single or double quotes, just alternate as needed or use escapes
        let name = 'Darth';
        expect(name).toBe("Darth");

        let story = 'She told him "Never!!!" and then stormed off';
        let author = "Flanner O'Connor";

        let story2 = "She told him \"Never!!!\" and then stormed off"
    });

    it('has string literals', () => {
        let story = `It was a dark and stormy night.
        
         The End`;

        console.log(story);

        expect('beer').toBe(`beer`);
    });

    it('has template strings', () => {
        const name = 'Heisenburg', age = 52;

        const info = 'His name was ' + name + ' and he was ' + age + ' years old.';
        const info2 = `His name was ${name} and he was ${age} years old.`;

        expect(info).toBe(info2);
        console.log(info2);
    });
});
describe('function literals', () => {
    it('how to declare a function', () => {
        // Named Function
        function add(a: number, b: number) {
            return a + b;
        }
        // An Anonymous Function With the Function Keyword
        const subtract = function (a: number, b: number) {
            return a - b;
        }

        // Anonymous Arrow Function
        const multiply = (a: number, b: number) => a * b;

        expect(add(4, 3)).toBe(7);
        expect(subtract(9, 3)).toBe(6);
        expect(multiply(4, 3)).toBe(12);
    });
});

describe('object literals & interfaces', () => {
    it('Interfaces', () => {

        interface Movie {
            title: string;
            director: string;
            yearReleased: number;
        };

        const movie: Movie = {
            title: 'Thor: Ragnarok',
            director: 'Taika Waititi',
            yearReleased: 2017
        }

        const CloverfieldLane: Movie = {
            title: '10 Cloverfield Lane',
            director: 'Dan Trachtenberg',
            yearReleased: 2016
        }

        expect(movie.title).toBe('Thor: Ragnarok');
        expect(movie['title']).toBe('Thor: Ragnarok'); //Indexer notation. Because title is one word, either notations work
        expect(CloverfieldLane.director).toBe('Dan Trachtenberg');

        const dataFromApi = {
            data: 'All is good',
            'generated at': 'DC Server'
        }

        expect(dataFromApi["generated at"]).toBe('DC Server'); //Because "generated at" is 2 words you MUST use indexer notation here

        console.log(`${movie.director}`);
    });

});
describe('array literals', () => {
    it('array literals', () => {
        const friends = ['Adam', 'James', 'Bruce', 'Elyse', 'Lawrence'];
        expect(friends[1]).toBe('James');
        expect(friends[999]).toBeUndefined();
        friends[999] = 'Peake';
        expect(friends[999]).toBe('Peake');

        // declaring without initializing
        let colors: string[];

        colors = ['Red', 'Green', 'Orange'];

        // You can also use this syntax if you like it better, but I don't (usually)

        let numbers: Array<number>;

        numbers = [1, 2, 3];

        let jumbled: (string | number)[] = [1, 'dog', 'cat']; //messy

        let jumbled1: Array<number | string>; //better

    });
    it('using tuple types', () => {

        let settings: [boolean, string, number] = [true, 'shirt', 12];

        const s = settings[2];

        // interface NameInfo { fullName: string, numberOfLetters: number };
        // function formatName(first: string, last: string): NameInfo {
        //     let fullName = `${last}, ${first}`;
        //     return {
        //         fullName,
        //         numberOfLetters: fullName.length
        //     };
        // }

        function formatName(first: string, last: string): [string, number] {
            let fullName = `${last}, ${first}`;
            return [fullName, fullName.length];
        }

        // const answer = formatName('Han', 'Solo');
        // expect(answer.fullName).toBe('Solo, Han');
        // expect(answer.numberOfLetters).toBe(9);

        const [theName, howLong] = formatName('Han', 'Solo');

        expect(theName).toBe('Solo, Han');
        expect(howLong).toBe(9);
    });
    describe('functions', () => {
        describe('params', () => {
            it('can do optional parameters', () => {

                type Char = string;

                function formatName(first: string, last: string, mi?: Char) { //? = optional, will be undefined 
                    let fullName = `${last}, ${first}`;

                    if (mi !== undefined) {
                        fullName += ` ${mi}.`;
                    }

                    return fullName;
                }
                expect(formatName('Han', 'Solo')).toBe('Solo, Han');
                expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
                console.log(formatName('Mike', 'Huszai', 'A'));
            });

            it('default values', () => {

                function add(a: number = 10, b: number = 5) {
                    return a + b;
                }

                expect(add(2, 2)).toBe(4);
                expect(add(9)).toBe(14);
                expect(add(undefined, 10)).toBe(20);
            });

            it('arbitrary number of arguments', () => {
                function add(a: number, b: number, ...rest: number[]) { //... is spread operatior 
                    let firstTwo = a + b;

                    return rest.reduce((state, next) => state + next, firstTwo);
                }

                expect(add(3, 4)).toBe(7);
                expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
                console.log(add(10, 11, 12, 13, 14, 15, 16, 17, 18, 19));
            });
        });
    });
});
describe('higher order functions', () => {
    it('a simple example', () => {
        type StringDecorator = (x: string) => string;
        const Identity: StringDecorator = (n) => n;

        function formatName(first: string, last: string, fn: StringDecorator = Identity) {
            return fn(`${last}, ${first}`);
        }

        expect(formatName('Luke', 'Skywalker')).toBe('Skywalker, Luke');

        expect(formatName('Han', 'Solo', paddItOut)).toBe('     Solo, Han     ');

        expect(formatName('Ben', 'Solo', (n) => '%%%' + n)).toBe('%%%Solo, Ben');

        function paddItOut(s: string) {
            return '     ' + s + '     ';
        }
        console.log(formatName('Kylo', 'Ren', (n) => '%%%' + n));

        console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => number * 2));
    });
});
describe('tag maker', () => {
    it('using a standard function', () => {
        // <h1> Content </h1>

        function tagMaker(tag: string, content: string) {
            return `<${tag}>${content}</${tag}>`;
        }
        expect(tagMaker('h1', 'Title')).toBe('<h1>Title</h1>');
    });
    it('an oop tagmaker', () => {
        class TagMaker {
            private tag: string;
            constructor(tag: string) {
                this.tag = tag;
            }
            make(content: string) {
                return `<${this.tag}>${content}</${this.tag}>`;
            }
        }

        const h1Maker = new TagMaker('h1');
        expect(h1Maker.make('Content')).toBe('<h1>Content</h1>');
        expect(h1Maker.make('Taco Salad')).toBe('<h1>Taco Salad</h1>');

    });
    it('as a higher-order function', () => {
        function tagMaker(tag: string): (content: string) => string {
            return (content: string) => `<${tag}>${content}</${tag}>`;;
        }

        const h1Maker = tagMaker('h1');
        const pMaker = tagMaker('p');

        expect(h1Maker('Content')).toBe('<h1>Content</h1>');
        expect(pMaker('Stuff')).toBe('<p>Stuff</p>');
    });
});
describe('Array Methods', () => {
    let numbers: number[];

    beforeEach(() => {
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    });

    it('has a foreach', () => {
        numbers.forEach((element, index, collection) => console.log({ element, index, collection }));

        // for (let element of numbers) {
        //     console.log(element);
        // }
    });
});

describe('methods that create a brand new array', () => {

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    it('map creates a new array based on the input from the sorce array', () => {

        const double = numbers.map(n => n * 2);
        expect(double).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
    });

    it('filter returns a new array with the elements that have passed the predicate', () => {
        const isEven = (n: number) => n % 2 === 0;
        const evens = numbers.filter(isEven);

        expect(evens).toEqual([2, 4, 6, 8]);

        const doubledEvens = numbers
            .filter(isEven)
            .map(n => n * 2);

        expect(doubledEvens).toEqual([4, 8, 12, 16]);
    });

    it('practice', () => {
        interface Vehicle {
            vin: string;
            makeAndModel: string;
            mileage: number;
        }
        const vehicles: Vehicle[] = [
            { vin: '9999', makeAndModel: 'Chevy Tahoe', mileage: 182000 },
            { vin: 'aka92', makeAndModel: 'Toyota Prius', mileage: 89999 },
            { vin: 'kduwi', makeAndModel: 'Ford Explorer', mileage: 99998 }
        ];

        // Your Code Here lowMileageVehicles < 100_000

        const lowMileageVehicles = vehicles
            .filter(v => v.mileage < 100_000)
            .map(v => v.makeAndModel);


        expect(lowMileageVehicles).toEqual(['Toyota Prius', 'Ford Explorer']);
    });
    it('reduce', () => {
        let answer = numbers.reduce((s, n) => s + n);
        expect(answer).toBe(45);

        answer = numbers.reduce((s, n, ) => s + n, 100); //s = state n = next and 100 sets the first state
        expect(answer).toBe(145);

    });

    it('a far out weird example of using reduce.', () => {


        interface State {
            count: number;
        }

        const initialState: State = {
            count: 0
        }

        /*
            We can do three different things to this state.
            We can increment it. (+1)
            We can decrement it. (-1)
            We can reset it (make it back to what it was at the beginning)
        */
        interface Action {
            type: string;
        }

        class Increment implements Action {
            readonly type = 'INCREMENT';
        }

        class Decrement implements Action {
            readonly type = 'DECREMENT';
        }

        class Reset implements Action {
            readonly type = 'RESET';
        }

        class SetAt implements Action {
            readonly type = 'SET';


            constructor(public value: number) { }
        }

        const userActions: Action[] = [
            new Increment(),
            new Decrement(),
            new Increment(),
            new Increment(),
            new Increment(),
            new Reset(),
            new Increment(),
            new SetAt(100),
            new Increment(),
            new Increment(),
            new Decrement()
        ];

        type allActions = Reset | Increment | Decrement | SetAt; //discriminated union - action.value wouldn't be available without this

        const endState = userActions.reduce((state: State, action: allActions): State => {
            switch (action.type) {
                case 'SET': {
                    return {
                        count: action.value
                    }
                }
                case 'INCREMENT': {
                    return {
                        count: state.count + 1
                    }
                }
                case 'DECREMENT': {
                    return {
                        count: state.count - 1
                    }
                }
                case 'RESET': {
                    return {
                        count: 0
                    }
                }
            }
        }, initialState)

        expect(endState.count).toBe(101);


    });
});