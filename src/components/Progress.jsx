import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';
import { Button } from 'react-bootstrap';

const Progress = ({ location: { pathname } }) => {
  const isFirstStep = pathname === '/';
  const isSecondStep = pathname === '/second';
  const isThirdStep = pathname === '/third';
  const isLogin = pathname === '/login';

  return (
    <>
      {isLogin ? (
        <div>
        </div>
      ) : (
        <div className='steps'>
          <div className={`${isFirstStep ? 'step active' : 'step'}`}>
            <div>1</div>
            <div>
              {isSecondStep || isThirdStep ? (
                <Link to='/'>Step 1</Link>
              ) : (
                'Step 1'
              )}
            </div>
          </div>
          <div className={`${isSecondStep ? 'step active' : 'step'}`}>
            <div>2</div>
            <div>
              {isFirstStep || isThirdStep ? (
                <Link to='/second'>Step 2</Link>
              ) : (
                'Step 2'
              )}
            </div>
          </div>
          <div className={`${isThirdStep ? 'step active' : 'step'}`}>
            <div>3</div>
            <div>
              {isSecondStep || isFirstStep ? (
                <Link to='/third'>Step 3</Link>
              ) : (
                'Step 3'
              )}
            </div>
          </div>
          <Link to='/Login'>
            <Button variant='info' type='submit'>
              Login
            </Button>
          </Link>
          <Link to='/'>
            <Button variant='info' type='submit' className='mx-3'>
              Register
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default withRouter(Progress);
