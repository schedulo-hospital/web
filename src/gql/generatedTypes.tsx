//@ts-nocheck
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  _FieldSet: any;
};

export type Availability = {
  __typename?: 'Availability';
  date: Scalars['Date'];
  id: Scalars['String'];
  type: AvailabilityType;
};

export type AvailabilityInput = {
  date: Scalars['Date'];
  type: AvailabilityType;
  /**  only for admins */
  userId?: InputMaybe<Scalars['String']>;
};

export enum AvailabilityType {
  Desired = 'DESIRED',
  None = 'NONE',
  Unavailable = 'UNAVAILABLE',
  Undesired = 'UNDESIRED'
}

export type Department = {
  __typename?: 'Department';
  createdBy: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

/** Department Connection */
export type DepartmentConnection = {
  __typename?: 'DepartmentConnection';
  /** Field edges */
  edges?: Maybe<Array<Maybe<DepartmentEdge>>>;
  /** Field pageInfo */
  pageInfo?: Maybe<PageInfo>;
};

/** Department Edge */
export type DepartmentEdge = {
  __typename?: 'DepartmentEdge';
  /** Field cursor */
  cursor?: Maybe<Scalars['String']>;
  /** Field node */
  node?: Maybe<Department>;
};

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN'
}

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDepartment?: Maybe<Department>;
  createOrganisation?: Maybe<Organisation>;
  createSchedule?: Maybe<Schedule>;
  departmentAddUser?: Maybe<Department>;
  login?: Maybe<LoginResponse>;
  organisationAddUser?: Maybe<Organisation>;
  register?: Maybe<LoginResponse>;
  setAvailability?: Maybe<Availability>;
  startSolving?: Maybe<Scalars['Boolean']>;
  stopSolving?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateDepartmentArgs = {
  name: Scalars['String'];
  organisationId: Scalars['String'];
};


export type MutationCreateOrganisationArgs = {
  input: OrganisationInput;
};


export type MutationCreateScheduleArgs = {
  departmentId: Scalars['String'];
  end: Scalars['Date'];
  name: Scalars['String'];
  start: Scalars['Date'];
};


export type MutationDepartmentAddUserArgs = {
  departmentId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  seniority: Seniority;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationOrganisationAddUserArgs = {
  email: Scalars['String'];
  organisationId: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSetAvailabilityArgs = {
  input: AvailabilityInput;
};


export type MutationStartSolvingArgs = {
  scheduleId: Scalars['String'];
};


export type MutationStopSolvingArgs = {
  scheduleId: Scalars['String'];
};

export type Organisation = {
  __typename?: 'Organisation';
  createdBy: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

/** Organisation Connection */
export type OrganisationConnection = {
  __typename?: 'OrganisationConnection';
  /** Field edges */
  edges?: Maybe<Array<Maybe<OrganisationEdge>>>;
  /** Field pageInfo */
  pageInfo?: Maybe<PageInfo>;
};

/** Organisation Edge */
export type OrganisationEdge = {
  __typename?: 'OrganisationEdge';
  /** Field cursor */
  cursor?: Maybe<Scalars['String']>;
  /** Field node */
  node?: Maybe<Organisation>;
};

export type OrganisationInput = {
  name: Scalars['String'];
};

/** PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Field endCursor */
  endCursor?: Maybe<Scalars['String']>;
  /** Field hasNextPage */
  hasNextPage: Scalars['Boolean'];
  /** Field hasPreviousPage */
  hasPreviousPage: Scalars['Boolean'];
  /** Field startCursor */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  availabilities: Array<Availability>;
  currentUser?: Maybe<User>;
  department?: Maybe<Department>;
  departmentUsers?: Maybe<UserConnection>;
  departments?: Maybe<DepartmentConnection>;
  organisation?: Maybe<Organisation>;
  organisations?: Maybe<OrganisationConnection>;
  schedule?: Maybe<Schedule>;
  schedules?: Maybe<ScheduleConnection>;
  shifts: Array<Shift>;
};


export type QueryAvailabilitiesArgs = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};


export type QueryDepartmentArgs = {
  id: Scalars['String'];
};


export type QueryDepartmentUsersArgs = {
  id: Scalars['String'];
};


export type QueryDepartmentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  organisationId: Scalars['String'];
};


export type QueryOrganisationArgs = {
  id: Scalars['String'];
};


export type QueryOrganisationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryScheduleArgs = {
  id: Scalars['String'];
};


export type QuerySchedulesArgs = {
  departmentId: Scalars['String'];
};


export type QueryShiftsArgs = {
  scheduleId: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Schedule = {
  __typename?: 'Schedule';
  end: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
  score?: Maybe<Scalars['String']>;
  start: Scalars['Date'];
  status?: Maybe<Scalars['String']>;
};

/** Schedule Connection */
export type ScheduleConnection = {
  __typename?: 'ScheduleConnection';
  /** Field edges */
  edges?: Maybe<Array<Maybe<ScheduleEdge>>>;
  /** Field pageInfo */
  pageInfo?: Maybe<PageInfo>;
};

/** Schedule Edge */
export type ScheduleEdge = {
  __typename?: 'ScheduleEdge';
  /** Field cursor */
  cursor?: Maybe<Scalars['String']>;
  /** Field node */
  node?: Maybe<Schedule>;
};

export enum Seniority {
  Junior = 'JUNIOR',
  Middle = 'MIDDLE',
  Senior = 'SENIOR'
}

export type Shift = {
  __typename?: 'Shift';
  end: Scalars['Date'];
  id: Scalars['String'];
  requiredSeniority: Seniority;
  start: Scalars['Date'];
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  seniority?: Maybe<Scalars['String']>;
};

/** User Connection */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** Field edges */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Field pageInfo */
  pageInfo?: Maybe<PageInfo>;
};

/** User Edge */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** Field cursor */
  cursor?: Maybe<Scalars['String']>;
  /** Field node */
  node?: Maybe<User>;
};

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String'];
};

export type CreateDepartmentMutationVariables = Exact<{
  organisationId: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateDepartmentMutation = { __typename?: 'Mutation', createDepartment?: { __typename?: 'Department', id: string, name: string } | null };

export type CreateOrganisationMutationVariables = Exact<{
  input: OrganisationInput;
}>;


export type CreateOrganisationMutation = { __typename?: 'Mutation', createOrganisation?: { __typename?: 'Organisation', id: string, name: string } | null };

export type CreateScheduleMutationVariables = Exact<{
  departmentId: Scalars['String'];
  name: Scalars['String'];
  start: Scalars['Date'];
  end: Scalars['Date'];
}>;


export type CreateScheduleMutation = { __typename?: 'Mutation', createSchedule?: { __typename?: 'Schedule', id: string, name: string, start: any, end: any } | null };

export type DepartmentAddUserMutationVariables = Exact<{
  departmentId: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  seniority: Seniority;
}>;


export type DepartmentAddUserMutation = { __typename?: 'Mutation', departmentAddUser?: { __typename?: 'Department', id: string, name: string } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null };

export type SetAvailabilityMutationVariables = Exact<{
  input: AvailabilityInput;
}>;


export type SetAvailabilityMutation = { __typename?: 'Mutation', setAvailability?: { __typename?: 'Availability', id: string, date: any, type: AvailabilityType } | null };

export type StartSolvingMutationVariables = Exact<{
  scheduleId: Scalars['String'];
}>;


export type StartSolvingMutation = { __typename?: 'Mutation', startSolving?: boolean | null };

export type StopSolvingMutationVariables = Exact<{
  scheduleId: Scalars['String'];
}>;


export type StopSolvingMutation = { __typename?: 'Mutation', stopSolving?: boolean | null };

export type AvailabilitiesQueryVariables = Exact<{
  from: Scalars['Date'];
  to: Scalars['Date'];
}>;


export type AvailabilitiesQuery = { __typename?: 'Query', availabilities: Array<{ __typename?: 'Availability', date: any, id: string, type: AvailabilityType }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, name: string, email: string } | null };

export type DepartmentUsersQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DepartmentUsersQuery = { __typename?: 'Query', departmentUsers?: { __typename?: 'UserConnection', edges?: Array<{ __typename?: 'UserEdge', node?: { __typename?: 'User', id: string, name: string, email: string, seniority?: string | null } | null } | null> | null } | null };

export type DepartmentsQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type DepartmentsQuery = { __typename?: 'Query', departments?: { __typename?: 'DepartmentConnection', edges?: Array<{ __typename?: 'DepartmentEdge', node?: { __typename?: 'Department', id: string, name: string } | null } | null> | null } | null };

export type OrganisationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganisationsQuery = { __typename?: 'Query', organisations?: { __typename?: 'OrganisationConnection', edges?: Array<{ __typename?: 'OrganisationEdge', node?: { __typename?: 'Organisation', id: string, name: string } | null } | null> | null } | null };

export type ScheduleQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ScheduleQuery = { __typename?: 'Query', schedule?: { __typename?: 'Schedule', id: string, name: string, start: any, end: any, score?: string | null, status?: string | null } | null };

export type SchedulesQueryVariables = Exact<{
  departmentId: Scalars['String'];
}>;


export type SchedulesQuery = { __typename?: 'Query', schedules?: { __typename?: 'ScheduleConnection', edges?: Array<{ __typename?: 'ScheduleEdge', node?: { __typename?: 'Schedule', id: string, name: string, start: any, end: any, score?: string | null } | null } | null> | null } | null };

export type ShiftsQueryVariables = Exact<{
  scheduleId: Scalars['String'];
}>;


export type ShiftsQuery = { __typename?: 'Query', shifts: Array<{ __typename?: 'Shift', id: string, requiredSeniority: Seniority, start: any, user?: { __typename?: 'User', name: string } | null }> };


export const CreateDepartmentDocument = gql`
    mutation createDepartment($organisationId: String!, $name: String!) {
  createDepartment(organisationId: $organisationId, name: $name) {
    id
    name
  }
}
    `;

export function useCreateDepartmentMutation() {
  return Urql.useMutation<CreateDepartmentMutation, CreateDepartmentMutationVariables>(CreateDepartmentDocument);
};
export const CreateOrganisationDocument = gql`
    mutation createOrganisation($input: OrganisationInput!) {
  createOrganisation(input: $input) {
    id
    name
  }
}
    `;

export function useCreateOrganisationMutation() {
  return Urql.useMutation<CreateOrganisationMutation, CreateOrganisationMutationVariables>(CreateOrganisationDocument);
};
export const CreateScheduleDocument = gql`
    mutation createSchedule($departmentId: String!, $name: String!, $start: Date!, $end: Date!) {
  createSchedule(
    departmentId: $departmentId
    name: $name
    start: $start
    end: $end
  ) {
    id
    name
    start
    end
  }
}
    `;

export function useCreateScheduleMutation() {
  return Urql.useMutation<CreateScheduleMutation, CreateScheduleMutationVariables>(CreateScheduleDocument);
};
export const DepartmentAddUserDocument = gql`
    mutation departmentAddUser($departmentId: String!, $name: String!, $email: String!, $seniority: Seniority!) {
  departmentAddUser(
    departmentId: $departmentId
    name: $name
    email: $email
    seniority: $seniority
  ) {
    id
    name
  }
}
    `;

export function useDepartmentAddUserMutation() {
  return Urql.useMutation<DepartmentAddUserMutation, DepartmentAddUserMutationVariables>(DepartmentAddUserDocument);
};
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      name
      email
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      id
      name
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SetAvailabilityDocument = gql`
    mutation setAvailability($input: AvailabilityInput!) {
  setAvailability(input: $input) {
    id
    date
    type
  }
}
    `;

export function useSetAvailabilityMutation() {
  return Urql.useMutation<SetAvailabilityMutation, SetAvailabilityMutationVariables>(SetAvailabilityDocument);
};
export const StartSolvingDocument = gql`
    mutation startSolving($scheduleId: String!) {
  startSolving(scheduleId: $scheduleId)
}
    `;

export function useStartSolvingMutation() {
  return Urql.useMutation<StartSolvingMutation, StartSolvingMutationVariables>(StartSolvingDocument);
};
export const StopSolvingDocument = gql`
    mutation stopSolving($scheduleId: String!) {
  stopSolving(scheduleId: $scheduleId)
}
    `;

export function useStopSolvingMutation() {
  return Urql.useMutation<StopSolvingMutation, StopSolvingMutationVariables>(StopSolvingDocument);
};
export const AvailabilitiesDocument = gql`
    query availabilities($from: Date!, $to: Date!) {
  availabilities(from: $from, to: $to) {
    date
    id
    type
  }
}
    `;

export function useAvailabilitiesQuery(options: Omit<Urql.UseQueryArgs<AvailabilitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<AvailabilitiesQuery, AvailabilitiesQueryVariables>({ query: AvailabilitiesDocument, ...options });
};
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    name
    email
  }
}
    `;

export function useCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentUserQuery, CurrentUserQueryVariables>({ query: CurrentUserDocument, ...options });
};
export const DepartmentUsersDocument = gql`
    query departmentUsers($id: String!) {
  departmentUsers(id: $id) {
    edges {
      node {
        id
        name
        email
        seniority
      }
    }
  }
}
    `;

export function useDepartmentUsersQuery(options: Omit<Urql.UseQueryArgs<DepartmentUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<DepartmentUsersQuery, DepartmentUsersQueryVariables>({ query: DepartmentUsersDocument, ...options });
};
export const DepartmentsDocument = gql`
    query departments($orgId: String!) {
  departments(organisationId: $orgId) {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

export function useDepartmentsQuery(options: Omit<Urql.UseQueryArgs<DepartmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<DepartmentsQuery, DepartmentsQueryVariables>({ query: DepartmentsDocument, ...options });
};
export const OrganisationsDocument = gql`
    query organisations {
  organisations {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

export function useOrganisationsQuery(options?: Omit<Urql.UseQueryArgs<OrganisationsQueryVariables>, 'query'>) {
  return Urql.useQuery<OrganisationsQuery, OrganisationsQueryVariables>({ query: OrganisationsDocument, ...options });
};
export const ScheduleDocument = gql`
    query schedule($id: String!) {
  schedule(id: $id) {
    id
    name
    start
    end
    score
    status
  }
}
    `;

export function useScheduleQuery(options: Omit<Urql.UseQueryArgs<ScheduleQueryVariables>, 'query'>) {
  return Urql.useQuery<ScheduleQuery, ScheduleQueryVariables>({ query: ScheduleDocument, ...options });
};
export const SchedulesDocument = gql`
    query schedules($departmentId: String!) {
  schedules(departmentId: $departmentId) {
    edges {
      node {
        id
        name
        start
        end
        score
      }
    }
  }
}
    `;

export function useSchedulesQuery(options: Omit<Urql.UseQueryArgs<SchedulesQueryVariables>, 'query'>) {
  return Urql.useQuery<SchedulesQuery, SchedulesQueryVariables>({ query: SchedulesDocument, ...options });
};
export const ShiftsDocument = gql`
    query shifts($scheduleId: String!) {
  shifts(scheduleId: $scheduleId) {
    id
    requiredSeniority
    start
    user {
      name
    }
  }
}
    `;

export function useShiftsQuery(options: Omit<Urql.UseQueryArgs<ShiftsQueryVariables>, 'query'>) {
  return Urql.useQuery<ShiftsQuery, ShiftsQueryVariables>({ query: ShiftsDocument, ...options });
};