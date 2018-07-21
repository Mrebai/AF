import React, {Component} from 'react';
import DropNav from './dropdownNav'
import { Link,withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
const men = {casual:['Jackets','hoodies & sweatshirts','polo shirts','sportswear','trousers & chinos','T-shirt'],formal:['jackets','shirts','suits','trousers']};
const women = {casual:['boots','pants','skirts','sportswear','trousers & chinos','T-shirt'],formal:['dresses','shirts','suits','trousers']};
class MainNav extends Component{
    constructor(props) {
        super(props);
        this.state = {isOpen: false,btnClr:false, active: "shown", selected:"m",casual:['Jackets','hoodies & sweatshirts','polo shirts','sportswear','trousers & chinos','Tshirt'],formal:['jackets','shirts','suits','trousers']};
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
  showDrop = () =>{

      this.setState({
        active:'shown'
    })
  };
    hideDrop = ()  =>{
        this.setState({
            active:'hidden'
        })
    };

  populateContent=(g) =>{

      if(g === 'm'){
        this.setState({casual:men.casual,formal:men.formal,selected:'m'})
      } else {
        this.setState({casual:women.casual,formal:women.formal,selected:'f'})
      }
  };
    inputHandle = () =>{
        (this.search.value)? this.setState({btnClr:true}):this.setState({btnClr:false});
        console.log(this.props.location.pathname.split("/")[3])

    };

  render(){
  return(
        <div className='container'>
            <Navbar color="light" light expand="md">
                <Link to="/" className="navbar-brand" href="#"> <img style={{height:'100%',width:'auto'}} src='/img/Logo.png'/></Link>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                MEN
                            </DropdownToggle>
                            <DropdownMenu className='dropMe'>

                                    <DropNav gender={"m"} casual={men.casual} formal={men.formal} />
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                WOMEN
                            </DropdownToggle>
                            <DropdownMenu className='dropMe'>

                                <DropNav gender={"f"} casual={women.casual} formal={women.formal} />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                           <Link  className="nav-link " to="/brand">THE BRAND</Link>
                        </NavItem>
                        <NavItem>
                            <Link  className="nav-link " to="/stores">LOCAL STORES</Link>
                        </NavItem>
                        <NavItem>
                            <div className="input-group searchBarContainer">

                                <input onChange={() => { this.inputHandle()}} className="form-control navSearch ml-2" ref={ (input) => this.search = input } type="search" placeholder="Search" aria-label="Search"  defaultValue={(this.props.location.pathname.split("/")[1] ==="search" )? this.props.location.pathname.split("/")[2]: null}/>
                                <div style={(this.state.btnClr)? { animationName:'toBlue', animationDuration:'1s', animationFillMode:'both'}: { animationName:'toWhite', animationDuration:'1s', animationFillMode:'both'}} className="input-group-prepend  searchBtn">
                                    <Link  to={(!this.search || !this.search.value)?'/search': '/search/'+ this.search.value} > <i className="fas fa-search searchIcon"></i></Link>
                                </div>
                            </div>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    )
  }
}

export default withRouter(MainNav)