import {Link, useSearchParams} from "react-router-dom";


const Success = () => {

    const [searchParams] = useSearchParams();
    const txn = searchParams.get('txn');

    return (
        <div className={'container d-flex justify-content-center align-items-center vh-100'}>
            <div className={'card p-5 shadow text-center'} style={{borderRadius: '20px', borderTop: '10px solid #198754'}}>
                <div className={'display-1 text-success'}>✔</div>
                <h2 className={'fw-bold text-success'}>Payment Success!</h2>
                <p className={'text-muted'}>Thank you for your practice transaction!</p>

                <div className={'bg-light p-3 rounded mb-4'}>
                    <span className={'text-secondary d-block'}>Transaction ID:</span>
                    <strong className={'text-dark'}>{txn}</strong>
                </div>

                <Link to={"/"} className={'btn btn-outline-success px-4'} >Make Another Payment</Link>
            </div>
        </div>
    );
};

export default Success;