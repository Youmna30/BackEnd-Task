import {validationResult , matchedData} from "express-validator"

// return response from validations of express validator 
export function checkValidations(req) {

    const validationErrors = validationResult(req).array({ onlyFirstError: true });
  
    if (validationErrors.length > 0) {
        apiError(422,validationErrors)
        throw error;
        
      return error
    }
  
    return matchedData(req);
  }

// return error message with status 
export function apiError (status,message) {
      const error = new Error()
      error.status = status
      error.message = message
      throw error

}