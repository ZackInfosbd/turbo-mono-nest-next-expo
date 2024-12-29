import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = null | T;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends Record<string, unknown>,
  K extends keyof T,
> = Partial<Record<K, never>>;
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  Boolean: { input: boolean; output: boolean };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date };
  Float: { input: number; output: number };
  ID: { input: string; output: string };
  Int: { input: number; output: number };
  String: { input: string; output: string };
}

export interface AuthOutput {
  __typename?: 'AuthOutput';
  token: Scalars['String']['output'];
  user: User;
}

export enum AuthProviderType {
  Apple = 'APPLE',
  Credentials = 'CREDENTIALS',
  Google = 'GOOGLE',
}

export interface CreateItemInput {
  name: Scalars['String']['input'];
}

export interface DateTimeFilter {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Scalars['String']['input'][]>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Scalars['String']['input'][]>;
}

export interface IntFilter {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
}

export interface Item {
  __typename?: 'Item';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
}

export interface ItemListRelationFilter {
  every?: InputMaybe<ItemWhereInput>;
  none?: InputMaybe<ItemWhereInput>;
  some?: InputMaybe<ItemWhereInput>;
}

export interface ItemOrderByRelationAggregateInput {
  _count?: InputMaybe<SortOrder>;
}

export interface ItemOrderByWithRelationInput {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
}

export enum ItemScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Image = 'image',
  Name = 'name',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export interface ItemWhereInput {
  AND?: InputMaybe<ItemWhereInput[]>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<ItemWhereInput[]>;
  OR?: InputMaybe<ItemWhereInput[]>;
  uid?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
}

export interface ItemWhereUniqueInput {
  id: Scalars['Int']['input'];
}

export interface LoginInput {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createItem: Item;
  login: AuthOutput;
  registerWithCredentials: AuthOutput;
  registerWithProviders: AuthOutput;
  removeItem: Item;
  removeUser: User;
  updateItem: Item;
  updateUser: User;
}

export interface MutationCreateItemArgs {
  createItemInput: CreateItemInput;
}

export interface MutationLoginArgs {
  loginInput: LoginInput;
}

export interface MutationRegisterWithCredentialsArgs {
  RegisterWithCredentialsInput: RegisterWithCredentialsInput;
}

export interface MutationRegisterWithProvidersArgs {
  RegisterWithProviderInput: RegisterWithProviderInput;
}

export interface MutationRemoveItemArgs {
  where: ItemWhereUniqueInput;
}

export interface MutationRemoveUserArgs {
  where: UserWhereUniqueInput;
}

export interface MutationUpdateItemArgs {
  updateItemInput: UpdateItemInput;
}

export interface MutationUpdateUserArgs {
  updateUserInput: UpdateUserInput;
}

export interface Query {
  __typename?: 'Query';
  item: Item;
  items: Item[];
  myItems: Item[];
  user: User;
  users: User[];
}

export interface QueryItemArgs {
  where: ItemWhereUniqueInput;
}

export interface QueryItemsArgs {
  cursor?: InputMaybe<ItemWhereUniqueInput>;
  distinct?: InputMaybe<ItemScalarFieldEnum[]>;
  orderBy?: InputMaybe<ItemOrderByWithRelationInput[]>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemWhereInput>;
}

export interface QueryMyItemsArgs {
  cursor?: InputMaybe<ItemWhereUniqueInput>;
  distinct?: InputMaybe<ItemScalarFieldEnum[]>;
  orderBy?: InputMaybe<ItemOrderByWithRelationInput[]>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemWhereInput>;
}

export interface QueryUserArgs {
  where: UserWhereUniqueInput;
}

export interface QueryUsersArgs {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<UserScalarFieldEnum[]>;
  orderBy?: InputMaybe<UserOrderByWithRelationInput[]>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export interface RegisterWithCredentialsInput {
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
}

export interface RegisterWithProviderInput {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sub: Scalars['String']['input'];
  type: AuthProviderType;
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface StringFilter {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Scalars['String']['input'][]>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Scalars['String']['input'][]>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
}

export interface UpdateItemInput {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface UpdateUserInput {
  sub: Scalars['String']['input'];
}

export interface User {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  items: Item[];
  name?: Maybe<Scalars['String']['output']>;
  sub: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
}

export interface UserOrderByWithRelationInput {
  createdAt?: InputMaybe<SortOrder>;
  Item?: InputMaybe<ItemOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  sub?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
}

export interface UserRelationFilter {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
}

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Image = 'image',
  Name = 'name',
  Sub = 'sub',
  UpdatedAt = 'updatedAt',
}

export interface UserWhereInput {
  AND?: InputMaybe<UserWhereInput[]>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Item?: InputMaybe<ItemListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<UserWhereInput[]>;
  OR?: InputMaybe<UserWhereInput[]>;
  sub?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
}

export interface UserWhereUniqueInput {
  sub: Scalars['String']['input'];
}

export type RegisterWithCredentialsMutationVariables = Exact<{
  registerWithCredentialsInput: RegisterWithCredentialsInput;
}>;

export interface RegisterWithCredentialsMutation {
  __typename?: 'Mutation';
  registerWithCredentials: {
    __typename?: 'AuthOutput';
    token: string;
    user: {
      __typename?: 'User';
      createdAt: Date;
      image?: null | string;
      name?: null | string;
      sub: string;
      updatedAt: Date;
    };
  };
}

export type RegisterWithProvidersMutationVariables = Exact<{
  registerWithProviderInput: RegisterWithProviderInput;
}>;

export interface RegisterWithProvidersMutation {
  __typename?: 'Mutation';
  registerWithProviders: {
    __typename?: 'AuthOutput';
    token: string;
    user: {
      __typename?: 'User';
      createdAt: Date;
      image?: null | string;
      name?: null | string;
      sub: string;
      updatedAt: Date;
    };
  };
}

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export interface LoginMutation {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthOutput';
    token: string;
    user: {
      __typename?: 'User';
      createdAt: Date;
      email: string;
      image?: null | string;
      items: {
        __typename?: 'Item';
        createdAt: Date;
        id: number;
        image?: null | string;
        name: string;
        uid: string;
        updatedAt: Date;
      }[];
      name?: null | string;
      sub: string;
      updatedAt: Date;
    };
  };
}

export type UserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;

export interface UserQuery {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    createdAt: Date;
    email: string;
    image?: null | string;
    items: {
      __typename?: 'Item';
      createdAt: Date;
      id: number;
      image?: null | string;
      name: string;
      uid: string;
      updatedAt: Date;
    }[];
    name?: null | string;
    sub: string;
    updatedAt: Date;
  };
}

export type ItemsQueryVariables = Exact<Record<string, never>>;

export interface ItemsQuery {
  __typename?: 'Query';
  items: {
    __typename?: 'Item';
    createdAt: Date;
    id: number;
    image?: null | string;
    name: string;
    uid: string;
    updatedAt: Date;
    user: { __typename?: 'User'; name?: null | string; sub: string };
  }[];
}

export type UsersQueryVariables = Exact<Record<string, never>>;

export interface UsersQuery {
  __typename?: 'Query';
  users: {
    __typename?: 'User';
    createdAt: Date;
    image?: null | string;
    items: { __typename?: 'Item'; createdAt: Date; name: string }[];
    name?: null | string;
    sub: string;
    updatedAt: Date;
  }[];
}

export const namedOperations = {
  Query: {
    User: 'User',
    Items: 'Items',
    Users: 'Users',
  },
  Mutation: {
    RegisterWithCredentials: 'RegisterWithCredentials',
    RegisterWithProviders: 'RegisterWithProviders',
    Login: 'Login',
  },
};

export const RegisterWithCredentialsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterWithCredentials' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'registerWithCredentialsInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterWithCredentialsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerWithCredentials' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'RegisterWithCredentialsInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'registerWithCredentialsInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'sub' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterWithCredentialsMutation,
  RegisterWithCredentialsMutationVariables
>;
export const RegisterWithProvidersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterWithProviders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'registerWithProviderInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterWithProviderInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerWithProviders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'RegisterWithProviderInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'registerWithProviderInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'sub' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterWithProvidersMutation,
  RegisterWithProvidersMutationVariables
>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'loginInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'loginInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'loginInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'sub' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'items' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'uid' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'User' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UserWhereUniqueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sub' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const ItemsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Items' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'sub' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ItemsQuery, ItemsQueryVariables>;
export const UsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Users' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sub' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
