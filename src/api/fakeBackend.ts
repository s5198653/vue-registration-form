enum ResponseType {
  SUCCESSFUL_RESPONSE = 'successfulResponse',
  NON_FIELD_ERROR = 'nonFieldError',
  EMAIL_ERROR = 'emailError',
}

let requestCount = -1;
export async function sendRegistrationForm(data: unknown) {
  await delay(1000);
  requestCount++;
  switch (requestCount % 3) {
    case 0:
      return Promise.resolve(getResponse(ResponseType.SUCCESSFUL_RESPONSE, data));
    case 1:
      return Promise.reject(getResponse(ResponseType.NON_FIELD_ERROR));
    default:
      return Promise.reject(getResponse(ResponseType.EMAIL_ERROR));
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getResponse(type: ResponseType, data?: unknown) {
  const response = {
    successfulResponse: { ok: true, data },
    nonFieldError: { nonFieldError: 'Oops, something went wrong.' },
    emailError: { email: 'User with this email already exists.' },
  };
  return response[type];
}
