export const stringify = obj => JSON.stringify(obj, null, 4);
export const log = obj => console.log(stringify(obj));
export function guard(asyncFn) {
	return async function(...args) {
		try {
			return await asyncFn(...args);
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
}