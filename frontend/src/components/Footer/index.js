import { Link } from 'react-router-dom'
import './footer.css'

function FooterComp() {



    return (
        <div className="footerWrapper">
            <div className="footerLeft">
            <p>2022 BnB</p>
                <Link to={'https://github.com/nwinzig'}>
                    GitHub
                </Link>
            </div>
            <div className="footerRight">
                <p className='language'>
                    English
                </p>
                <p>
                    $ USD
                </p>
            </div>
        </div>
    )
}

export default FooterComp
