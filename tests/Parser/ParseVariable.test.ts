import { expect } from 'chai';
import Eval from '../../src/Interpreter/Eval'
import TYPES from '../../src/Interpreter/Tokenizer/TokenType'
import Tokenizer from '../../src/Interpreter/Tokenizer/Tokenizer';
import 'mocha'


class Tester extends Eval {

  private tests = [
    {
      input: 'max: 2x + 5;',
      expected: ['x']
    }, {
      input: 'max:2x+5;',
      expected: ['x']
    }, {
      input: 'max\n:\n2\nx\n+\n5\n;\n',
      expected: ['x']
    }, {
      input: 'max2x+5;',
      expected: ['max2x']
    }, {
      input: 'max: 4max2x + 5;',
      expected: ['max2x']
    }, {
      input: 'max x+5;',
      expected: ['x']
    }, {
      input: 'max ...x+5;',
      expected: ['x']
    }, {
      input: 'max 215x+5;',
      expected: ['x']
    }, {
      input: 'fen: 215x+5 <= 120;',
      expected: ['fen', 'x']
    }, {
      input: 'fen: 30 <= 215x+5 <= 120;',
      expected: ['fen', 'x']
    }, {
      input: 'sum [i = 12 to 43] (30 <= 215x_ij+5 <= 120);',
      expected: ['i', 'x_ij']
    }, {
      input: 'set x = 12;',
      expected: ['x']
    }, {
      input: 'set x = sum [t = 1 to 5] (z_t);',
      expected: ['x', 't', 'z_t']
    }, {
      input: 'for x = 1 to 5: y_x + z_x = 12',
      expected: ['x', 'y_x', 'z_x']
    },
  ]

  constructor() {
    super()
  }

  public runTest() {
    this.tests.forEach(x => {
      describe('Tokenizer', () => {
        it(`This should parse the variables in the input:\n${x.input}`, () => {
          const result = new Tokenizer(x.input);
          const expected = x.expected
          let index = 0
          while (result.hasNext()) {
            const token = result.poll()
            if (token.getType() === TYPES.Word)
              expect(this.parseVariable(token)).to.equal(expected[index++]);
          }
        });
      });
    })
  }
}

const Test = new Tester()
Test.runTest()

