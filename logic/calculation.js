export default class Calculation {
    constructor(expression)
	{	// Keep the expression in mind //
        this.expression = expression;
		
		// Include the results from the last evaluation for speed & access //
		this.terms_str = [];
		this.ops = [];
		this.result = [];
    }
	
	// The main purpose of this class //
    calculate()
	{	// -- INITIALIZE -- //
		const OP_LIST = ['+', '-', '*', '/', '^', '%'];			// Available operations //
		const OP_ORDER = [['^'], ['*', '/', '%'], ['+', '-']];	// Order of operations, groups happen Left to Right //
		
		// --- PARSE & VALIDATE EXPRESSION -- //
		// Split the expression into terms and operators //
		let [terms_str, ops] = this.splitExpression(this.expression, OP_LIST);
		
		// Parse the terms into numbers (shallow copy) //	
		let terms = this.parseTerms([...terms_str]);
		
		// Check if the expression was properly validated //
		if(terms === null) return false;
		
		// -- EVALUATE EXPRESSION -- //
		// Evaluate the parsed terms and operators to find the result //
		let result = this.evaluate(terms, ops, OP_ORDER);
		
		// -- UPDATE OBJECT PARAMETERS -- //
		// This is just to expose the string values so we can use them later //
		this.terms_str = terms_str;
		this.ops = ops;
		this.result = result;
		
		// -- OUTPUT -- //
		// Return the end result of the calculation //
		return result;
		
		// Dev note: I do not expect this function to properly consider negative numbers. 
		// Seeing as it does not consider parentheses, the only negative number could be 
		// the first one. Come back to this if functionality is necessary.
    }
	
	// Other helpful functions //
	splitExpression(expression, OP_LIST)
	{	// Parses a mathematical expression using the operators indicated in OP_LIST //
		// -- INITIALIZE -- //
		let terms = [];	// Values input between operators 	//
		let ops = [];	// Operations to perform on values 	//
		
		let exp = this.expression;	// Copy in the expression //
		
		// -- PARSE EXPRESSION -- //
		// Iterate through exp and determine where operators are //
		let op_idx = -1;
		for(let i = 0; i < exp.length; i++)
		{	// Check if this character is one of the available operators //
			let c = exp.charAt(i);
			if(OP_LIST.includes(c))
			{	// Segment off the string before this character as the value //
				terms.push(exp.slice(op_idx + 1, i));
				
				// Append this operator to the end of ops //
				ops.push(c);
				
				// Update the index of the last operator //
				op_idx = i;
			}
		}
		// Append the remainder of the expression as the last value //
		terms.push(exp.slice(op_idx + 1));
		
		// -- OUTPUT -- //
		// Return the term strings and operators //
		return [terms, ops];
	}
	parseTerms(terms)
	{	// -- PARSE & VALIDATE TERMS -- //
		// We need to check to make sure that each term in the expression is a valid number //
		var numeric = /^[0-9.]+$/	// RegExp for only numbers and decimals //
		for(let i = 0; i < terms.length; i++)
		{	// Check if this term is wholly numeric //
			if(!terms[i].match(numeric)) return null	// It wasn't //
			
			// The term is numeric! Parse it //
			terms[i] = parseFloat(terms[i]);
		}
		
		// -- OUTPUT -- //
		// The terms were successfully parsed! //
		return terms;
	}
	evaluate(terms, ops, OP_ORDER)
	{	// Evaluates the expression parsed into terms and operators //
		// -- INITIALIZE -- //
		// Make a quick copy of the terms and operations for mutability safety //
		let terms_ = [...terms];	// Shallow copy is fine as it is a single dimension array //
		let ops_ = [...ops];
		
		// -- EVALUATE -- //
		// Go through the order of operations and iterate through the terms and ops //
		for(let step = 0; step < OP_ORDER.length; step++)
		{	// Get this step in the order of operations //
			let step_ops = OP_ORDER[step];
			
			// Go through the available operations and perform the applicable operation //
			for(let i = 0; i < ops_.length; i++)
			{	// Check if this operation is in this step's operations //
				if(!step_ops.includes(ops_[i])) continue;	// If not, go to the next operator //
				
				// Evaluate the operator to get the new term //
				let new_term = terms_[i];
				switch(ops_[i])
				{	// Determine the operation behavior via brute-force //
					case '+': new_term += terms_[i+1]; break;				// Addition 		//
					case '-': new_term -= terms_[i+1]; break;				// Subtraction 		//
					case '*': new_term *= terms_[i+1]; break;				// Multiplication 	//
					case '/': new_term /= terms_[i+1]; break;				// Division 		//
					case '^': new_term = new_term ** terms_[i+1]; break;	// Exponentiation 	//
					case '%': new_term %= terms_[i+1]; break;				// Modulo		 	//
					default: return null;	// Not implemented! How did you get here anyway? //
				}
				// Replace these two terms with the new term and remove the operation //
				terms_[i] = new_term;
				terms_.splice(i+1, 1);
				ops_.splice(i, 1);
				
				// Decrement the inner loop because we have mutated the term list //
				i--;
			}
		}
		
		// -- OUTPUT -- //
		// Return the evaluation results //
		return terms_[0];	// Note that terms_ is still an array of length 1! //
	}
}
