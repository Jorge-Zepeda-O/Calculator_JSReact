import React from "react";
import Paragraph from "./Paragraph";
import Calculation from "../logic/calculation";
import {History, AddEntry} from "./History";

/** @namespace React.Component */
// --- LAYOUT COMPONENT --- //
export default class Layout extends React.Component
{	// Constructor //
    constructor(props)
	{	// Call super //
        super(props);

		// Define this component's state //
        this.state = {
            value: '',
            content: ''
        };
	
		// Bind any functions we may have //
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	// Event handling //
    handleChange(event)
	{	 // Get the text from the input field and update the state accordingly //
		 let val = event.target.value;
		 this.setState({value: val})
    }
    handleSubmit(event)
	{
        event.preventDefault();
		
		// -- INITIALIZE -- //
		// Instantiate a new calculator //
		let Calc = new Calculation(this.state.value);
		
		// Default value for the content - something went wrong during calculation! //
        let content = 'Wrong input!';

		// -- EVALUATION -- //
		// Evaluate the expression in the text box //
        let result = Calc.calculate();
		
		// -- VISUALIZATION -- //
		// Re-construct the expression to display the result //
        if (result !== false)
		{	// Initialize the content string //
			content = Calc.terms_str[0].toString();
			
			// Append each operation //
			for(let i = 0; i < Calc.ops.length; i++)
				content += ' ' + Calc.ops[i].toString() + ' ' + Calc.terms_str[i+1].toString();
			content += ' = ' + result.toString();
			
			// Update the history //
			AddEntry(content);
		}

		// -- UPDATE STATE -- //
        this.setState({content: content});
    }

	// Rendering //
    render()
	{
        return (
            <div>
                <div className="row">
                    <h1 className="col-md-8 col-md-offset-2 text-center">itdesign - React calculator</h1>
                </div>

                <div className="container">
                    <div className="row">
                        <form className="col-md-6 col-md-offset-3 text-center" onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control col-md-9" placeholder="expression..."
                                   onChange={this.handleChange}/>
                            <input className="btn btn-success" type="submit" value="Submit"/>
                        </form>
                    </div>

                    <Paragraph content={this.state.content}/>
					
					<History />
                </div>
            </div>
        )
    }
}

