import React from "react";
import Paragraph from "./Paragraph";

/** @namespace React.Component */
// -- HELPFUL FUNCTIONS -- //
export function AddEntry(expr)
{	// Append the new entry to the top of the list //
	let entries_ = [<li>{expr}</li>, ...this.state.entries];
	let histnum_ = [... this.state.histnum, <li>{this.state.entries.length+1}</li>];
	
	// Update state //
	this.setState({entries: entries_, histnum: histnum_});
}

// --- HISTORY COMPONENT --- //
export class History extends React.Component
{	// Constructor //
    constructor(props)
	{	// Call to super //
        super(props);

		// Define this component's state //
        this.state = { 
			histnum: [],
			entries: []
		};
		
		// Bind any functions we may have //
		this.handleClear = this.handleClear.bind(this);
		AddEntry = AddEntry.bind(this);
    }
	
	// Event handling //
	handleClear(event)
	{	// Clears the history entries //
		this.setState({histnum:[], entries:[]});
	}

	// Rendering //
    render()
	{
        return (
			<div className="panel panel-default">
                <p className="panel-heading" style={{justifyContent:'flex-end'}}>
					<grid style={{width:"100%"}}>
						History
						<button
							style={{float:"right", paddingBottom:"0px", paddingTop:"0px"}}
							className="btn btn-danger"
							onClick={this.handleClear}
						>
							Clear
						</button>
					</grid>
				</p>

                <p className="panel-body">
					<div className="row">
						<ol 
							className="col-md-1 text-center" 
							style={{listStyle:"none", width:"5%", alignment:"center", borderRight:"1px solid gray"}}
						> 
							{this.state.histnum} 
						</ol>
						<ol 
							className="col-md-1" 
							style={{listStyle:"none", width:"95%", borderLeft:"1px solid gray"}}
						> 
							{this.state.entries}
						</ol>
					</div>					
                </p>
            </div>
        )
    }
}