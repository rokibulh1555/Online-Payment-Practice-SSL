import {Link} from "react-router-dom";


const Fail = () => {
    return (
        <div className={'container d-flex justify-content-center align-items-center vh-100'}>
            <div className={'card p-5 shadow text-center'} style={{borderRadius: '20px', borderTop: '10px solid #dc3545'}}>
                <div className={'display-1 text-danger mb-3'}>✘</div>
                <h3 className={'fw-bold text-center'}>Payment Failed!</h3>
                <p className={'text-muted'}>Something went wrong or the transaction was declined.</p>
                
                <Link to={"/"} className={'btn btn-danger px-4 mt-3'}>Try Again</Link>
            </div>
        </div>
    );
};

export default Fail;