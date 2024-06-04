export class LateCheckInValidationError extends Error {
  constructor() {
    super("The check-in must be validated until 20 min of its created");
  }
}
