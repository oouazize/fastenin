import { useContext } from 'react';
import CsrfTokenContext from '../context/contexts/csrf';

/**
 * @description Retrieves the current CSRF token in the CsrfTokenContext context
 * If not found, it will return an empty string. If required, the API will throw an error
 */
function useCsrfToken() {
  const token = useContext(CsrfTokenContext);

  return token || '';
}

export default useCsrfToken;
