export const REG = 'reg';
export const login = (body, callback) =>  dispatch => {
      let payload = {
        userDetails: body
      }
      dispatch({
        type: REG,
        payload
      });


    }
  



