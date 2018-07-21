import React from 'react'
import Row from './row'
export default Footer = () =>{
    return(
        <footer>
            <div className='row mt-5'>
                <Row title={'INFORMATION'} content={['The breand','Local stores','Customer service','Piracy & cookies','Site map']}/>
                <Row title={'WHY BUY FROM US'} content={['Shippng and returns','Secure shopping','Testimonials','Award winning','Ethical standing']}/>
                <Row title={'INFORMATION'} content={['The breand','Local stores','Customer service','Piracy & cookies','Site map']}/>
                <Row title={'CONTACT'} content={['Heard Office Avenue Fashion 180-182 Regent Street London','Telephone 0123-456-789','Email: support@yourwebsite.com']}/>
            </div>
            <div className="container ">
                <div className="row">
                    <div className="col col-md-6 mt-4 awardContainer footerItemContainer align-items-center">
                        <div className="award ">
                            <div className="allAwards">
                                <h4 className="awardWinner"> AWARD WINNER</h4>
                                <h5 className="fashionAward"> FASHION AWARD 2016</h5>
                            </div>

                        </div>
                    </div>
                    <div className="col col-md-6 mt-4 footerItemContainer align-self-stretch">
                        <div className="socialMedia align-self-center">
                            <div className="d-flex justify-content-center ">
                                <span className='fab fa-facebook-f social align-self-cente'></span>
                                <span className='fab fa-twitter social align-self-cente'></span>
                                <span className='fab fa-instagram social align-self-cente'></span>
                                <span className='fab fa-pinterest-p social align-self-cente'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}