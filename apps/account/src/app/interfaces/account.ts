export interface PasswordStruct {
	/**
	 *  @inject_tag: bson:"hashed,omitempty"
	 */
	hashed: string;
}

export interface AuthServices {
	/**
	 *  @inject_tag: bson:"password,omitempty"
	 */
	password: PasswordStruct | undefined;
}

export interface EmailObject {
	/**
	 *  @inject_tag: bson:"address,omitempty"
	 */
	address: string;
	/**
	 *  @inject_tag: bson:"verified,omitempty"
	 */
	verified: boolean;
	/**
	 *  @inject_tag: bson:"primary,omitempty"
	 */
	primary: boolean;
	/**
	 *  @inject_tag: bson:"verificationCode"
	 */
	verificationCode: string;
}

export interface User {
	/**
	 *  @inject_tag: bson:"_id,omitempty"
	 */
	id: string;
	/**
	 *  @inject_tag: bson:"username,omitempty"
	 */
	username: string;
	/**
	 *  @inject_tag: bson:"primaryEmail,omitempty"
	 */
	primaryEmail: string;
	/**
	 *  @inject_tag: bson:"firstname,omitempty"
	 */
	firstname: string;
	/**
	 *  @inject_tag: bson:"lastname,omitempty"
	 */
	lastname: string;
	/**
	 *  @inject_tag: bson:"createdAt,omitempty"
	 */
	createdAt: string;
	/**
	 *  @inject_tag: bson:"updatedAt,omitempty"
	 */
	updatedAt: string;
	/**
	 *  @inject_tag: bson:"emails,omitempty"
	 */
	emails: EmailObject[];
	/**
	 *  @inject_tag: bson:"services,omitempty"
	 */
	services: AuthServices | undefined;
	/**
	 *  @inject_tag: bson:"settings,omitempty"
	 */
	settings: Settings | undefined;
}

export interface Settings {

}

export interface Session {
	id: string;
	email: string;
	/**
	 *  unix
	 */
	created: number;
	/**
	 *  unix
	 */
	expires: number;
}

export interface CreateRequest {
	username: string;
	password: string;
	email: string;
	firstname: string;
	lastname: string;
	service: LoginServiceTypes;
	tokens: { [key: string]: string };
}

export interface CreateRequest_TokensEntry {
	key: string;
	value: string;
}

export interface CreateResponse {
	activationLink: string;
}

export interface ReadRequest {
	query: string;
}

export interface ReadResponse {
	user: User | undefined;
}



export interface ForgotPasswordRequest {
	email: string;
}

export interface ForgotPasswordResponse {
	success: boolean;
}

export interface SearchRequest {
	username: string;
	email: string;
	limit: number;
	offset: number;
}

export interface SearchResponse {
	users: User[];
}

export interface ReadSessionRequest {
	sessionId: string;
}

export interface ReadSessionResponse {
	session: Session | undefined;
}

export interface LoginTypeParams {
	accessToken: string;
	userId: string;
	password: string;
	email: string;
}

export interface LoginRequest {
	service: LoginServiceTypes;
	params: LoginTypeParams | undefined;
}

export interface LoginResponse {
	session: Session | undefined;
	user: User | undefined;
}

export interface LogoutRequest {
	sessionId: string;
}

export interface LogoutResponse {
	success: boolean;
}

export const LoginServiceTypes = {
	Password: 0 as LoginServiceTypes,
	Facebook: 1 as LoginServiceTypes,
	Github: 2 as LoginServiceTypes,
	Google: 3 as LoginServiceTypes,
	fromJSON(object: any): LoginServiceTypes {
		switch (object) {
			case 0:
			case 'Password':
				return LoginServiceTypes.Password;
			default:
				throw new global.Error(`Invalid value ${object}`);
		}
	},
	toJSON(object: LoginServiceTypes): string {
		switch (object) {
			case LoginServiceTypes.Password:
				return 'Password';
			default:
				return 'UNKNOWN';
		}
	},
};

export type LoginServiceTypes = 0 | 1 | 2 | 3;


