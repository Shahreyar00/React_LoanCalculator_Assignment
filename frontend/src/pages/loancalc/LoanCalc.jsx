import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loanJS from "loanjs";
import { logOut } from '../../redux/userRedux';
import Navbar from '../../components/navbar/Navbar';
import "./loancalc.scss";
import { useNavigate } from 'react-router-dom';


const LoanCalc = () => {

    const cUser = useSelector((state)=>state.user.currentUser);
    // console.log(cUser);

    const [values, setValues] = useState({
        "loan-amount": 0,
        "interest-rate": 0,
        "loan-term": 0,
    });
    const [installments, setInstallments] = useState([]);
    
    const handleInputChange = (e) =>{
        e.preventDefault();
        const newValues = {...values};
        newValues[e.target.name] = e.target.value;
        setValues(newValues);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        var loan = new loanJS.Loan(
            values["loan-amount"],
            values["loan-term"]*12,
            values["interest-rate"]
        )

        setInstallments(loan.installments);
    }

    const amountFormat = (amount) =>
        new Intl.NumberFormat("en-IN",{ 
            maximumSignificantDigits:3,
            style: "currency",
            currency: "INR"
        }).format(amount);
    

    return (
        <div className="loanContainer">
            <Navbar />
            <div className="loanBody">
                <div className="loanWrapper">
                    <h1 className="title">Loan calculator</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="formItem">
                        <label htmlFor="loan-amount">Loan Amount</label>
                        <div className="form-input">
                            <input
                                required
                                type="number"
                                name="loan-amount"
                                placeholder="0"
                                value={values["loan-amount"]}
                                onChange={handleInputChange}
                                />
                        </div>
                    </div>
                    <div className="formItem">
                        <label htmlFor="interest-rate">Interest Rate</label>
                        <div className="form-input">
                            <input
                                required
                                type="number"
                                name="interest-rate"
                                placeholder="0"
                                value={values["interest-rate"]}
                                onChange={handleInputChange}
                                />
                        </div>
                    </div>
                    <div className="formItem">
                        <label htmlFor="loan-term">Loan Term (Years)</label>
                        <div className="form-input">
                            <input
                                required
                                type="number"
                                name="loan-term"
                                placeholder="0"
                                value={values["loan-term"]}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-action">
                        <input 
                            type="submit" 
                            value="Calculate"
                            className="calcBtn"    
                        />
                    </div>
                </form>
            </div>

            {(installments.length>0) && 
                <div className="tableWrapper">
                    <div className="tableTitle">Your Montly Instllments</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Payment Amount</th>
                                <th>Interest Paid</th>
                                <th>Principal Paid</th>
                                <th>Remaining Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {installments.map((i,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{amountFormat(i.installment)}</td>
                                    <td>{amountFormat(i.interest)}</td>
                                    <td>{amountFormat(i.capital)}</td>
                                    <td>{amountFormat(i.remain)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default LoanCalc