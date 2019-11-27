import EvalResult from "./EvalState/EvalResult";
import EvalState from "./EvalState/EvalState";

export default abstract class AbstractModel {

  protected isDefined(self: any) {
    if (self !== undefined) {
      throw new Error(`${this.constructor.toString()} overloaded. Duplicate properties. ${self} is already a value.`)
    }
  }

  abstract getValues(): Object;

  abstract evaluate(state: EvalState): EvalResult;

}