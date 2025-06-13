
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Kiosk
 * 
 */
export type Kiosk = $Result.DefaultSelection<Prisma.$KioskPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Dispute
 * 
 */
export type Dispute = $Result.DefaultSelection<Prisma.$DisputePayload>
/**
 * Model DocumentStatusHistory
 * 
 */
export type DocumentStatusHistory = $Result.DefaultSelection<Prisma.$DocumentStatusHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  VISITOR: 'VISITOR',
  USER: 'USER',
  POSTER: 'POSTER',
  KIOSK_MANAGER: 'KIOSK_MANAGER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Condition: {
  GOOD: 'GOOD',
  MEDIUM: 'MEDIUM',
  BAD: 'BAD'
};

export type Condition = (typeof Condition)[keyof typeof Condition]


export const DocumentStatus: {
  UPLOADED: 'UPLOADED',
  AWAITING_KIOSK_ACK: 'AWAITING_KIOSK_ACK',
  KIOSK_CONFIRMED: 'KIOSK_CONFIRMED',
  CLAIMED: 'CLAIMED',
  DISPATCHED: 'DISPATCHED',
  ARCHIVED: 'ARCHIVED'
};

export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus]


export const NotificationType: {
  CLAIM: 'CLAIM',
  UPLOAD: 'UPLOAD',
  KIOSK_ACK: 'KIOSK_ACK',
  KIOSK_DISPATCH: 'KIOSK_DISPATCH',
  REMINDER: 'REMINDER',
  DISPUTE: 'DISPUTE'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const NotificationChannel: {
  EMAIL: 'EMAIL',
  SMS: 'SMS'
};

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel]


export const DisputeCategory: {
  WRONG_PERSON: 'WRONG_PERSON',
  INCORRECT_DETAILS: 'INCORRECT_DETAILS',
  FRAUD: 'FRAUD',
  OTHER: 'OTHER'
};

export type DisputeCategory = (typeof DisputeCategory)[keyof typeof DisputeCategory]


export const DisputeStatus: {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED'
};

export type DisputeStatus = (typeof DisputeStatus)[keyof typeof DisputeStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Condition = $Enums.Condition

export const Condition: typeof $Enums.Condition

export type DocumentStatus = $Enums.DocumentStatus

export const DocumentStatus: typeof $Enums.DocumentStatus

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

export type NotificationChannel = $Enums.NotificationChannel

export const NotificationChannel: typeof $Enums.NotificationChannel

export type DisputeCategory = $Enums.DisputeCategory

export const DisputeCategory: typeof $Enums.DisputeCategory

export type DisputeStatus = $Enums.DisputeStatus

export const DisputeStatus: typeof $Enums.DisputeStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kiosk`: Exposes CRUD operations for the **Kiosk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kiosks
    * const kiosks = await prisma.kiosk.findMany()
    * ```
    */
  get kiosk(): Prisma.KioskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dispute`: Exposes CRUD operations for the **Dispute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disputes
    * const disputes = await prisma.dispute.findMany()
    * ```
    */
  get dispute(): Prisma.DisputeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentStatusHistory`: Exposes CRUD operations for the **DocumentStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentStatusHistories
    * const documentStatusHistories = await prisma.documentStatusHistory.findMany()
    * ```
    */
  get documentStatusHistory(): Prisma.DocumentStatusHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Document: 'Document',
    Kiosk: 'Kiosk',
    Notification: 'Notification',
    Dispute: 'Dispute',
    DocumentStatusHistory: 'DocumentStatusHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "document" | "kiosk" | "notification" | "dispute" | "documentStatusHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Kiosk: {
        payload: Prisma.$KioskPayload<ExtArgs>
        fields: Prisma.KioskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KioskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KioskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>
          }
          findFirst: {
            args: Prisma.KioskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KioskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>
          }
          findMany: {
            args: Prisma.KioskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>[]
          }
          create: {
            args: Prisma.KioskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>
          }
          createMany: {
            args: Prisma.KioskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KioskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>[]
          }
          delete: {
            args: Prisma.KioskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>
          }
          update: {
            args: Prisma.KioskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>
          }
          deleteMany: {
            args: Prisma.KioskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KioskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KioskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>[]
          }
          upsert: {
            args: Prisma.KioskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KioskPayload>
          }
          aggregate: {
            args: Prisma.KioskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKiosk>
          }
          groupBy: {
            args: Prisma.KioskGroupByArgs<ExtArgs>
            result: $Utils.Optional<KioskGroupByOutputType>[]
          }
          count: {
            args: Prisma.KioskCountArgs<ExtArgs>
            result: $Utils.Optional<KioskCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Dispute: {
        payload: Prisma.$DisputePayload<ExtArgs>
        fields: Prisma.DisputeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisputeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisputeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          findFirst: {
            args: Prisma.DisputeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisputeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          findMany: {
            args: Prisma.DisputeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          create: {
            args: Prisma.DisputeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          createMany: {
            args: Prisma.DisputeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisputeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          delete: {
            args: Prisma.DisputeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          update: {
            args: Prisma.DisputeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          deleteMany: {
            args: Prisma.DisputeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisputeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DisputeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          upsert: {
            args: Prisma.DisputeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          aggregate: {
            args: Prisma.DisputeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDispute>
          }
          groupBy: {
            args: Prisma.DisputeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisputeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisputeCountArgs<ExtArgs>
            result: $Utils.Optional<DisputeCountAggregateOutputType> | number
          }
        }
      }
      DocumentStatusHistory: {
        payload: Prisma.$DocumentStatusHistoryPayload<ExtArgs>
        fields: Prisma.DocumentStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.DocumentStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.DocumentStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.DocumentStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.DocumentStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.DocumentStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>
          }
          update: {
            args: Prisma.DocumentStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.DocumentStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentStatusHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>[]
          }
          upsert: {
            args: Prisma.DocumentStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.DocumentStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentStatusHistory>
          }
          groupBy: {
            args: Prisma.DocumentStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentStatusHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    document?: DocumentOmit
    kiosk?: KioskOmit
    notification?: NotificationOmit
    dispute?: DisputeOmit
    documentStatusHistory?: DocumentStatusHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    documents: number
    claims: number
    disputes: number
    managedKiosks: number
    notifications: number
    statusChanges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs
    claims?: boolean | UserCountOutputTypeCountClaimsArgs
    disputes?: boolean | UserCountOutputTypeCountDisputesArgs
    managedKiosks?: boolean | UserCountOutputTypeCountManagedKiosksArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    statusChanges?: boolean | UserCountOutputTypeCountStatusChangesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDisputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountManagedKiosksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KioskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStatusChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentStatusHistoryWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    statusHistory: number
    notifications: number
    disputes: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | DocumentCountOutputTypeCountStatusHistoryArgs
    notifications?: boolean | DocumentCountOutputTypeCountNotificationsArgs
    disputes?: boolean | DocumentCountOutputTypeCountDisputesArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentStatusHistoryWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountDisputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
  }


  /**
   * Count Type KioskCountOutputType
   */

  export type KioskCountOutputType = {
    documents: number
    managers: number
  }

  export type KioskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | KioskCountOutputTypeCountDocumentsArgs
    managers?: boolean | KioskCountOutputTypeCountManagersArgs
  }

  // Custom InputTypes
  /**
   * KioskCountOutputType without action
   */
  export type KioskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KioskCountOutputType
     */
    select?: KioskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KioskCountOutputType without action
   */
  export type KioskCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * KioskCountOutputType without action
   */
  export type KioskCountOutputTypeCountManagersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    phone: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    phone: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    phone?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    phone: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    documents?: boolean | User$documentsArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    disputes?: boolean | User$disputesArgs<ExtArgs>
    managedKiosks?: boolean | User$managedKiosksArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    statusChanges?: boolean | User$statusChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    phone?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "phone" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | User$documentsArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    disputes?: boolean | User$disputesArgs<ExtArgs>
    managedKiosks?: boolean | User$managedKiosksArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    statusChanges?: boolean | User$statusChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      claims: Prisma.$DocumentPayload<ExtArgs>[]
      disputes: Prisma.$DisputePayload<ExtArgs>[]
      managedKiosks: Prisma.$KioskPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      statusChanges: Prisma.$DocumentStatusHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      phone: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends User$documentsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claims<T extends User$claimsArgs<ExtArgs> = {}>(args?: Subset<T, User$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    disputes<T extends User$disputesArgs<ExtArgs> = {}>(args?: Subset<T, User$disputesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    managedKiosks<T extends User$managedKiosksArgs<ExtArgs> = {}>(args?: Subset<T, User$managedKiosksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusChanges<T extends User$statusChangesArgs<ExtArgs> = {}>(args?: Subset<T, User$statusChangesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.documents
   */
  export type User$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * User.claims
   */
  export type User$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * User.disputes
   */
  export type User$disputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    cursor?: DisputeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * User.managedKiosks
   */
  export type User$managedKiosksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    where?: KioskWhereInput
    orderBy?: KioskOrderByWithRelationInput | KioskOrderByWithRelationInput[]
    cursor?: KioskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KioskScalarFieldEnum | KioskScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.statusChanges
   */
  export type User$statusChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    where?: DocumentStatusHistoryWhereInput
    orderBy?: DocumentStatusHistoryOrderByWithRelationInput | DocumentStatusHistoryOrderByWithRelationInput[]
    cursor?: DocumentStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentStatusHistoryScalarFieldEnum | DocumentStatusHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    documentNumber: string | null
    foundLocation: string | null
    foundDistrict: string | null
    foundDivision: string | null
    foundSubLocation: string | null
    dateFound: Date | null
    condition: $Enums.Condition | null
    kioskId: string | null
    posterId: string | null
    claimedById: string | null
    status: $Enums.DocumentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    expiredAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    documentNumber: string | null
    foundLocation: string | null
    foundDistrict: string | null
    foundDivision: string | null
    foundSubLocation: string | null
    dateFound: Date | null
    condition: $Enums.Condition | null
    kioskId: string | null
    posterId: string | null
    claimedById: string | null
    status: $Enums.DocumentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    expiredAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    firstName: number
    middleName: number
    lastName: number
    dateOfBirth: number
    documentNumber: number
    foundLocation: number
    foundDistrict: number
    foundDivision: number
    foundSubLocation: number
    dateFound: number
    condition: number
    kioskId: number
    posterId: number
    claimedById: number
    status: number
    createdAt: number
    updatedAt: number
    expiredAt: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    documentNumber?: true
    foundLocation?: true
    foundDistrict?: true
    foundDivision?: true
    foundSubLocation?: true
    dateFound?: true
    condition?: true
    kioskId?: true
    posterId?: true
    claimedById?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    expiredAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    documentNumber?: true
    foundLocation?: true
    foundDistrict?: true
    foundDivision?: true
    foundSubLocation?: true
    dateFound?: true
    condition?: true
    kioskId?: true
    posterId?: true
    claimedById?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    expiredAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    documentNumber?: true
    foundLocation?: true
    foundDistrict?: true
    foundDivision?: true
    foundSubLocation?: true
    dateFound?: true
    condition?: true
    kioskId?: true
    posterId?: true
    claimedById?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    expiredAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    firstName: string
    middleName: string | null
    lastName: string
    dateOfBirth: Date
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    claimedById: string | null
    status: $Enums.DocumentStatus
    createdAt: Date
    updatedAt: Date
    expiredAt: Date | null
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    documentNumber?: boolean
    foundLocation?: boolean
    foundDistrict?: boolean
    foundDivision?: boolean
    foundSubLocation?: boolean
    dateFound?: boolean
    condition?: boolean
    kioskId?: boolean
    posterId?: boolean
    claimedById?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiredAt?: boolean
    kiosk?: boolean | KioskDefaultArgs<ExtArgs>
    poster?: boolean | UserDefaultArgs<ExtArgs>
    claimedBy?: boolean | Document$claimedByArgs<ExtArgs>
    statusHistory?: boolean | Document$statusHistoryArgs<ExtArgs>
    notifications?: boolean | Document$notificationsArgs<ExtArgs>
    disputes?: boolean | Document$disputesArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    documentNumber?: boolean
    foundLocation?: boolean
    foundDistrict?: boolean
    foundDivision?: boolean
    foundSubLocation?: boolean
    dateFound?: boolean
    condition?: boolean
    kioskId?: boolean
    posterId?: boolean
    claimedById?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiredAt?: boolean
    kiosk?: boolean | KioskDefaultArgs<ExtArgs>
    poster?: boolean | UserDefaultArgs<ExtArgs>
    claimedBy?: boolean | Document$claimedByArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    documentNumber?: boolean
    foundLocation?: boolean
    foundDistrict?: boolean
    foundDivision?: boolean
    foundSubLocation?: boolean
    dateFound?: boolean
    condition?: boolean
    kioskId?: boolean
    posterId?: boolean
    claimedById?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiredAt?: boolean
    kiosk?: boolean | KioskDefaultArgs<ExtArgs>
    poster?: boolean | UserDefaultArgs<ExtArgs>
    claimedBy?: boolean | Document$claimedByArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    documentNumber?: boolean
    foundLocation?: boolean
    foundDistrict?: boolean
    foundDivision?: boolean
    foundSubLocation?: boolean
    dateFound?: boolean
    condition?: boolean
    kioskId?: boolean
    posterId?: boolean
    claimedById?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiredAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "middleName" | "lastName" | "dateOfBirth" | "documentNumber" | "foundLocation" | "foundDistrict" | "foundDivision" | "foundSubLocation" | "dateFound" | "condition" | "kioskId" | "posterId" | "claimedById" | "status" | "createdAt" | "updatedAt" | "expiredAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kiosk?: boolean | KioskDefaultArgs<ExtArgs>
    poster?: boolean | UserDefaultArgs<ExtArgs>
    claimedBy?: boolean | Document$claimedByArgs<ExtArgs>
    statusHistory?: boolean | Document$statusHistoryArgs<ExtArgs>
    notifications?: boolean | Document$notificationsArgs<ExtArgs>
    disputes?: boolean | Document$disputesArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kiosk?: boolean | KioskDefaultArgs<ExtArgs>
    poster?: boolean | UserDefaultArgs<ExtArgs>
    claimedBy?: boolean | Document$claimedByArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kiosk?: boolean | KioskDefaultArgs<ExtArgs>
    poster?: boolean | UserDefaultArgs<ExtArgs>
    claimedBy?: boolean | Document$claimedByArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      kiosk: Prisma.$KioskPayload<ExtArgs>
      poster: Prisma.$UserPayload<ExtArgs>
      claimedBy: Prisma.$UserPayload<ExtArgs> | null
      statusHistory: Prisma.$DocumentStatusHistoryPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      disputes: Prisma.$DisputePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      middleName: string | null
      lastName: string
      dateOfBirth: Date
      documentNumber: string
      foundLocation: string
      foundDistrict: string
      foundDivision: string
      foundSubLocation: string
      dateFound: Date
      condition: $Enums.Condition
      kioskId: string
      posterId: string
      claimedById: string | null
      status: $Enums.DocumentStatus
      createdAt: Date
      updatedAt: Date
      expiredAt: Date | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kiosk<T extends KioskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KioskDefaultArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    poster<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    claimedBy<T extends Document$claimedByArgs<ExtArgs> = {}>(args?: Subset<T, Document$claimedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    statusHistory<T extends Document$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Document$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Document$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Document$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    disputes<T extends Document$disputesArgs<ExtArgs> = {}>(args?: Subset<T, Document$disputesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly firstName: FieldRef<"Document", 'String'>
    readonly middleName: FieldRef<"Document", 'String'>
    readonly lastName: FieldRef<"Document", 'String'>
    readonly dateOfBirth: FieldRef<"Document", 'DateTime'>
    readonly documentNumber: FieldRef<"Document", 'String'>
    readonly foundLocation: FieldRef<"Document", 'String'>
    readonly foundDistrict: FieldRef<"Document", 'String'>
    readonly foundDivision: FieldRef<"Document", 'String'>
    readonly foundSubLocation: FieldRef<"Document", 'String'>
    readonly dateFound: FieldRef<"Document", 'DateTime'>
    readonly condition: FieldRef<"Document", 'Condition'>
    readonly kioskId: FieldRef<"Document", 'String'>
    readonly posterId: FieldRef<"Document", 'String'>
    readonly claimedById: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'DocumentStatus'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
    readonly expiredAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.claimedBy
   */
  export type Document$claimedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Document.statusHistory
   */
  export type Document$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    where?: DocumentStatusHistoryWhereInput
    orderBy?: DocumentStatusHistoryOrderByWithRelationInput | DocumentStatusHistoryOrderByWithRelationInput[]
    cursor?: DocumentStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentStatusHistoryScalarFieldEnum | DocumentStatusHistoryScalarFieldEnum[]
  }

  /**
   * Document.notifications
   */
  export type Document$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Document.disputes
   */
  export type Document$disputesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    cursor?: DisputeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Kiosk
   */

  export type AggregateKiosk = {
    _count: KioskCountAggregateOutputType | null
    _min: KioskMinAggregateOutputType | null
    _max: KioskMaxAggregateOutputType | null
  }

  export type KioskMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    phone: string | null
    hours: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KioskMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    phone: string | null
    hours: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KioskCountAggregateOutputType = {
    id: number
    name: number
    location: number
    phone: number
    hours: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KioskMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    phone?: true
    hours?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KioskMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    phone?: true
    hours?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KioskCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    phone?: true
    hours?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KioskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kiosk to aggregate.
     */
    where?: KioskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kiosks to fetch.
     */
    orderBy?: KioskOrderByWithRelationInput | KioskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KioskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kiosks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kiosks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kiosks
    **/
    _count?: true | KioskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KioskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KioskMaxAggregateInputType
  }

  export type GetKioskAggregateType<T extends KioskAggregateArgs> = {
        [P in keyof T & keyof AggregateKiosk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKiosk[P]>
      : GetScalarType<T[P], AggregateKiosk[P]>
  }




  export type KioskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KioskWhereInput
    orderBy?: KioskOrderByWithAggregationInput | KioskOrderByWithAggregationInput[]
    by: KioskScalarFieldEnum[] | KioskScalarFieldEnum
    having?: KioskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KioskCountAggregateInputType | true
    _min?: KioskMinAggregateInputType
    _max?: KioskMaxAggregateInputType
  }

  export type KioskGroupByOutputType = {
    id: string
    name: string
    location: string
    phone: string
    hours: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: KioskCountAggregateOutputType | null
    _min: KioskMinAggregateOutputType | null
    _max: KioskMaxAggregateOutputType | null
  }

  type GetKioskGroupByPayload<T extends KioskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KioskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KioskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KioskGroupByOutputType[P]>
            : GetScalarType<T[P], KioskGroupByOutputType[P]>
        }
      >
    >


  export type KioskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    hours?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    documents?: boolean | Kiosk$documentsArgs<ExtArgs>
    managers?: boolean | Kiosk$managersArgs<ExtArgs>
    _count?: boolean | KioskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kiosk"]>

  export type KioskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    hours?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["kiosk"]>

  export type KioskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    hours?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["kiosk"]>

  export type KioskSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    phone?: boolean
    hours?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KioskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "phone" | "hours" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["kiosk"]>
  export type KioskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | Kiosk$documentsArgs<ExtArgs>
    managers?: boolean | Kiosk$managersArgs<ExtArgs>
    _count?: boolean | KioskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KioskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type KioskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $KioskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kiosk"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      managers: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string
      phone: string
      hours: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["kiosk"]>
    composites: {}
  }

  type KioskGetPayload<S extends boolean | null | undefined | KioskDefaultArgs> = $Result.GetResult<Prisma.$KioskPayload, S>

  type KioskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KioskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KioskCountAggregateInputType | true
    }

  export interface KioskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kiosk'], meta: { name: 'Kiosk' } }
    /**
     * Find zero or one Kiosk that matches the filter.
     * @param {KioskFindUniqueArgs} args - Arguments to find a Kiosk
     * @example
     * // Get one Kiosk
     * const kiosk = await prisma.kiosk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KioskFindUniqueArgs>(args: SelectSubset<T, KioskFindUniqueArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Kiosk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KioskFindUniqueOrThrowArgs} args - Arguments to find a Kiosk
     * @example
     * // Get one Kiosk
     * const kiosk = await prisma.kiosk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KioskFindUniqueOrThrowArgs>(args: SelectSubset<T, KioskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kiosk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KioskFindFirstArgs} args - Arguments to find a Kiosk
     * @example
     * // Get one Kiosk
     * const kiosk = await prisma.kiosk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KioskFindFirstArgs>(args?: SelectSubset<T, KioskFindFirstArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kiosk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KioskFindFirstOrThrowArgs} args - Arguments to find a Kiosk
     * @example
     * // Get one Kiosk
     * const kiosk = await prisma.kiosk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KioskFindFirstOrThrowArgs>(args?: SelectSubset<T, KioskFindFirstOrThrowArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Kiosks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KioskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kiosks
     * const kiosks = await prisma.kiosk.findMany()
     * 
     * // Get first 10 Kiosks
     * const kiosks = await prisma.kiosk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kioskWithIdOnly = await prisma.kiosk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KioskFindManyArgs>(args?: SelectSubset<T, KioskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Kiosk.
     * @param {KioskCreateArgs} args - Arguments to create a Kiosk.
     * @example
     * // Create one Kiosk
     * const Kiosk = await prisma.kiosk.create({
     *   data: {
     *     // ... data to create a Kiosk
     *   }
     * })
     * 
     */
    create<T extends KioskCreateArgs>(args: SelectSubset<T, KioskCreateArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Kiosks.
     * @param {KioskCreateManyArgs} args - Arguments to create many Kiosks.
     * @example
     * // Create many Kiosks
     * const kiosk = await prisma.kiosk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KioskCreateManyArgs>(args?: SelectSubset<T, KioskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Kiosks and returns the data saved in the database.
     * @param {KioskCreateManyAndReturnArgs} args - Arguments to create many Kiosks.
     * @example
     * // Create many Kiosks
     * const kiosk = await prisma.kiosk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Kiosks and only return the `id`
     * const kioskWithIdOnly = await prisma.kiosk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KioskCreateManyAndReturnArgs>(args?: SelectSubset<T, KioskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Kiosk.
     * @param {KioskDeleteArgs} args - Arguments to delete one Kiosk.
     * @example
     * // Delete one Kiosk
     * const Kiosk = await prisma.kiosk.delete({
     *   where: {
     *     // ... filter to delete one Kiosk
     *   }
     * })
     * 
     */
    delete<T extends KioskDeleteArgs>(args: SelectSubset<T, KioskDeleteArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Kiosk.
     * @param {KioskUpdateArgs} args - Arguments to update one Kiosk.
     * @example
     * // Update one Kiosk
     * const kiosk = await prisma.kiosk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KioskUpdateArgs>(args: SelectSubset<T, KioskUpdateArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Kiosks.
     * @param {KioskDeleteManyArgs} args - Arguments to filter Kiosks to delete.
     * @example
     * // Delete a few Kiosks
     * const { count } = await prisma.kiosk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KioskDeleteManyArgs>(args?: SelectSubset<T, KioskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kiosks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KioskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kiosks
     * const kiosk = await prisma.kiosk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KioskUpdateManyArgs>(args: SelectSubset<T, KioskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kiosks and returns the data updated in the database.
     * @param {KioskUpdateManyAndReturnArgs} args - Arguments to update many Kiosks.
     * @example
     * // Update many Kiosks
     * const kiosk = await prisma.kiosk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Kiosks and only return the `id`
     * const kioskWithIdOnly = await prisma.kiosk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KioskUpdateManyAndReturnArgs>(args: SelectSubset<T, KioskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Kiosk.
     * @param {KioskUpsertArgs} args - Arguments to update or create a Kiosk.
     * @example
     * // Update or create a Kiosk
     * const kiosk = await prisma.kiosk.upsert({
     *   create: {
     *     // ... data to create a Kiosk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kiosk we want to update
     *   }
     * })
     */
    upsert<T extends KioskUpsertArgs>(args: SelectSubset<T, KioskUpsertArgs<ExtArgs>>): Prisma__KioskClient<$Result.GetResult<Prisma.$KioskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Kiosks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KioskCountArgs} args - Arguments to filter Kiosks to count.
     * @example
     * // Count the number of Kiosks
     * const count = await prisma.kiosk.count({
     *   where: {
     *     // ... the filter for the Kiosks we want to count
     *   }
     * })
    **/
    count<T extends KioskCountArgs>(
      args?: Subset<T, KioskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KioskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kiosk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KioskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KioskAggregateArgs>(args: Subset<T, KioskAggregateArgs>): Prisma.PrismaPromise<GetKioskAggregateType<T>>

    /**
     * Group by Kiosk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KioskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KioskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KioskGroupByArgs['orderBy'] }
        : { orderBy?: KioskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KioskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKioskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kiosk model
   */
  readonly fields: KioskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kiosk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KioskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends Kiosk$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Kiosk$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    managers<T extends Kiosk$managersArgs<ExtArgs> = {}>(args?: Subset<T, Kiosk$managersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Kiosk model
   */
  interface KioskFieldRefs {
    readonly id: FieldRef<"Kiosk", 'String'>
    readonly name: FieldRef<"Kiosk", 'String'>
    readonly location: FieldRef<"Kiosk", 'String'>
    readonly phone: FieldRef<"Kiosk", 'String'>
    readonly hours: FieldRef<"Kiosk", 'String'>
    readonly isActive: FieldRef<"Kiosk", 'Boolean'>
    readonly createdAt: FieldRef<"Kiosk", 'DateTime'>
    readonly updatedAt: FieldRef<"Kiosk", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Kiosk findUnique
   */
  export type KioskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * Filter, which Kiosk to fetch.
     */
    where: KioskWhereUniqueInput
  }

  /**
   * Kiosk findUniqueOrThrow
   */
  export type KioskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * Filter, which Kiosk to fetch.
     */
    where: KioskWhereUniqueInput
  }

  /**
   * Kiosk findFirst
   */
  export type KioskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * Filter, which Kiosk to fetch.
     */
    where?: KioskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kiosks to fetch.
     */
    orderBy?: KioskOrderByWithRelationInput | KioskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kiosks.
     */
    cursor?: KioskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kiosks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kiosks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kiosks.
     */
    distinct?: KioskScalarFieldEnum | KioskScalarFieldEnum[]
  }

  /**
   * Kiosk findFirstOrThrow
   */
  export type KioskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * Filter, which Kiosk to fetch.
     */
    where?: KioskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kiosks to fetch.
     */
    orderBy?: KioskOrderByWithRelationInput | KioskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kiosks.
     */
    cursor?: KioskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kiosks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kiosks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kiosks.
     */
    distinct?: KioskScalarFieldEnum | KioskScalarFieldEnum[]
  }

  /**
   * Kiosk findMany
   */
  export type KioskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * Filter, which Kiosks to fetch.
     */
    where?: KioskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kiosks to fetch.
     */
    orderBy?: KioskOrderByWithRelationInput | KioskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kiosks.
     */
    cursor?: KioskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kiosks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kiosks.
     */
    skip?: number
    distinct?: KioskScalarFieldEnum | KioskScalarFieldEnum[]
  }

  /**
   * Kiosk create
   */
  export type KioskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * The data needed to create a Kiosk.
     */
    data: XOR<KioskCreateInput, KioskUncheckedCreateInput>
  }

  /**
   * Kiosk createMany
   */
  export type KioskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kiosks.
     */
    data: KioskCreateManyInput | KioskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kiosk createManyAndReturn
   */
  export type KioskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * The data used to create many Kiosks.
     */
    data: KioskCreateManyInput | KioskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kiosk update
   */
  export type KioskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * The data needed to update a Kiosk.
     */
    data: XOR<KioskUpdateInput, KioskUncheckedUpdateInput>
    /**
     * Choose, which Kiosk to update.
     */
    where: KioskWhereUniqueInput
  }

  /**
   * Kiosk updateMany
   */
  export type KioskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kiosks.
     */
    data: XOR<KioskUpdateManyMutationInput, KioskUncheckedUpdateManyInput>
    /**
     * Filter which Kiosks to update
     */
    where?: KioskWhereInput
    /**
     * Limit how many Kiosks to update.
     */
    limit?: number
  }

  /**
   * Kiosk updateManyAndReturn
   */
  export type KioskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * The data used to update Kiosks.
     */
    data: XOR<KioskUpdateManyMutationInput, KioskUncheckedUpdateManyInput>
    /**
     * Filter which Kiosks to update
     */
    where?: KioskWhereInput
    /**
     * Limit how many Kiosks to update.
     */
    limit?: number
  }

  /**
   * Kiosk upsert
   */
  export type KioskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * The filter to search for the Kiosk to update in case it exists.
     */
    where: KioskWhereUniqueInput
    /**
     * In case the Kiosk found by the `where` argument doesn't exist, create a new Kiosk with this data.
     */
    create: XOR<KioskCreateInput, KioskUncheckedCreateInput>
    /**
     * In case the Kiosk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KioskUpdateInput, KioskUncheckedUpdateInput>
  }

  /**
   * Kiosk delete
   */
  export type KioskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
    /**
     * Filter which Kiosk to delete.
     */
    where: KioskWhereUniqueInput
  }

  /**
   * Kiosk deleteMany
   */
  export type KioskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kiosks to delete
     */
    where?: KioskWhereInput
    /**
     * Limit how many Kiosks to delete.
     */
    limit?: number
  }

  /**
   * Kiosk.documents
   */
  export type Kiosk$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Kiosk.managers
   */
  export type Kiosk$managersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Kiosk without action
   */
  export type KioskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kiosk
     */
    select?: KioskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kiosk
     */
    omit?: KioskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KioskInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    documentId: string | null
    type: $Enums.NotificationType | null
    channel: $Enums.NotificationChannel | null
    message: string | null
    sent: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    documentId: string | null
    type: $Enums.NotificationType | null
    channel: $Enums.NotificationChannel | null
    message: string | null
    sent: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    documentId: number
    type: number
    channel: number
    message: number
    sent: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    documentId?: true
    type?: true
    channel?: true
    message?: true
    sent?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    documentId?: true
    type?: true
    channel?: true
    message?: true
    sent?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    documentId?: true
    type?: true
    channel?: true
    message?: true
    sent?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string | null
    documentId: string | null
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentId?: boolean
    type?: boolean
    channel?: boolean
    message?: boolean
    sent?: boolean
    createdAt?: boolean
    user?: boolean | Notification$userArgs<ExtArgs>
    document?: boolean | Notification$documentArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentId?: boolean
    type?: boolean
    channel?: boolean
    message?: boolean
    sent?: boolean
    createdAt?: boolean
    user?: boolean | Notification$userArgs<ExtArgs>
    document?: boolean | Notification$documentArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentId?: boolean
    type?: boolean
    channel?: boolean
    message?: boolean
    sent?: boolean
    createdAt?: boolean
    user?: boolean | Notification$userArgs<ExtArgs>
    document?: boolean | Notification$documentArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    documentId?: boolean
    type?: boolean
    channel?: boolean
    message?: boolean
    sent?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "documentId" | "type" | "channel" | "message" | "sent" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Notification$userArgs<ExtArgs>
    document?: boolean | Notification$documentArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Notification$userArgs<ExtArgs>
    document?: boolean | Notification$documentArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Notification$userArgs<ExtArgs>
    document?: boolean | Notification$documentArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      document: Prisma.$DocumentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      documentId: string | null
      type: $Enums.NotificationType
      channel: $Enums.NotificationChannel
      message: string
      sent: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Notification$userArgs<ExtArgs> = {}>(args?: Subset<T, Notification$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    document<T extends Notification$documentArgs<ExtArgs> = {}>(args?: Subset<T, Notification$documentArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly documentId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly channel: FieldRef<"Notification", 'NotificationChannel'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly sent: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification.user
   */
  export type Notification$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Notification.document
   */
  export type Notification$documentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model Dispute
   */

  export type AggregateDispute = {
    _count: DisputeCountAggregateOutputType | null
    _min: DisputeMinAggregateOutputType | null
    _max: DisputeMaxAggregateOutputType | null
  }

  export type DisputeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    documentId: string | null
    category: $Enums.DisputeCategory | null
    explanation: string | null
    status: $Enums.DisputeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DisputeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    documentId: string | null
    category: $Enums.DisputeCategory | null
    explanation: string | null
    status: $Enums.DisputeStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DisputeCountAggregateOutputType = {
    id: number
    userId: number
    documentId: number
    category: number
    explanation: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DisputeMinAggregateInputType = {
    id?: true
    userId?: true
    documentId?: true
    category?: true
    explanation?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DisputeMaxAggregateInputType = {
    id?: true
    userId?: true
    documentId?: true
    category?: true
    explanation?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DisputeCountAggregateInputType = {
    id?: true
    userId?: true
    documentId?: true
    category?: true
    explanation?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DisputeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dispute to aggregate.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disputes
    **/
    _count?: true | DisputeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisputeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisputeMaxAggregateInputType
  }

  export type GetDisputeAggregateType<T extends DisputeAggregateArgs> = {
        [P in keyof T & keyof AggregateDispute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDispute[P]>
      : GetScalarType<T[P], AggregateDispute[P]>
  }




  export type DisputeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithAggregationInput | DisputeOrderByWithAggregationInput[]
    by: DisputeScalarFieldEnum[] | DisputeScalarFieldEnum
    having?: DisputeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisputeCountAggregateInputType | true
    _min?: DisputeMinAggregateInputType
    _max?: DisputeMaxAggregateInputType
  }

  export type DisputeGroupByOutputType = {
    id: string
    userId: string
    documentId: string
    category: $Enums.DisputeCategory
    explanation: string | null
    status: $Enums.DisputeStatus
    createdAt: Date
    updatedAt: Date
    _count: DisputeCountAggregateOutputType | null
    _min: DisputeMinAggregateOutputType | null
    _max: DisputeMaxAggregateOutputType | null
  }

  type GetDisputeGroupByPayload<T extends DisputeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisputeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisputeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisputeGroupByOutputType[P]>
            : GetScalarType<T[P], DisputeGroupByOutputType[P]>
        }
      >
    >


  export type DisputeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentId?: boolean
    category?: boolean
    explanation?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentId?: boolean
    category?: boolean
    explanation?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    documentId?: boolean
    category?: boolean
    explanation?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectScalar = {
    id?: boolean
    userId?: boolean
    documentId?: boolean
    category?: boolean
    explanation?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DisputeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "documentId" | "category" | "explanation" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["dispute"]>
  export type DisputeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DisputeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DisputeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $DisputePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dispute"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      documentId: string
      category: $Enums.DisputeCategory
      explanation: string | null
      status: $Enums.DisputeStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dispute"]>
    composites: {}
  }

  type DisputeGetPayload<S extends boolean | null | undefined | DisputeDefaultArgs> = $Result.GetResult<Prisma.$DisputePayload, S>

  type DisputeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DisputeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DisputeCountAggregateInputType | true
    }

  export interface DisputeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dispute'], meta: { name: 'Dispute' } }
    /**
     * Find zero or one Dispute that matches the filter.
     * @param {DisputeFindUniqueArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisputeFindUniqueArgs>(args: SelectSubset<T, DisputeFindUniqueArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dispute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DisputeFindUniqueOrThrowArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisputeFindUniqueOrThrowArgs>(args: SelectSubset<T, DisputeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dispute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindFirstArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisputeFindFirstArgs>(args?: SelectSubset<T, DisputeFindFirstArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dispute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindFirstOrThrowArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisputeFindFirstOrThrowArgs>(args?: SelectSubset<T, DisputeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Disputes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disputes
     * const disputes = await prisma.dispute.findMany()
     * 
     * // Get first 10 Disputes
     * const disputes = await prisma.dispute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disputeWithIdOnly = await prisma.dispute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisputeFindManyArgs>(args?: SelectSubset<T, DisputeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dispute.
     * @param {DisputeCreateArgs} args - Arguments to create a Dispute.
     * @example
     * // Create one Dispute
     * const Dispute = await prisma.dispute.create({
     *   data: {
     *     // ... data to create a Dispute
     *   }
     * })
     * 
     */
    create<T extends DisputeCreateArgs>(args: SelectSubset<T, DisputeCreateArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Disputes.
     * @param {DisputeCreateManyArgs} args - Arguments to create many Disputes.
     * @example
     * // Create many Disputes
     * const dispute = await prisma.dispute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisputeCreateManyArgs>(args?: SelectSubset<T, DisputeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Disputes and returns the data saved in the database.
     * @param {DisputeCreateManyAndReturnArgs} args - Arguments to create many Disputes.
     * @example
     * // Create many Disputes
     * const dispute = await prisma.dispute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Disputes and only return the `id`
     * const disputeWithIdOnly = await prisma.dispute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisputeCreateManyAndReturnArgs>(args?: SelectSubset<T, DisputeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dispute.
     * @param {DisputeDeleteArgs} args - Arguments to delete one Dispute.
     * @example
     * // Delete one Dispute
     * const Dispute = await prisma.dispute.delete({
     *   where: {
     *     // ... filter to delete one Dispute
     *   }
     * })
     * 
     */
    delete<T extends DisputeDeleteArgs>(args: SelectSubset<T, DisputeDeleteArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dispute.
     * @param {DisputeUpdateArgs} args - Arguments to update one Dispute.
     * @example
     * // Update one Dispute
     * const dispute = await prisma.dispute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisputeUpdateArgs>(args: SelectSubset<T, DisputeUpdateArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Disputes.
     * @param {DisputeDeleteManyArgs} args - Arguments to filter Disputes to delete.
     * @example
     * // Delete a few Disputes
     * const { count } = await prisma.dispute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisputeDeleteManyArgs>(args?: SelectSubset<T, DisputeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disputes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disputes
     * const dispute = await prisma.dispute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisputeUpdateManyArgs>(args: SelectSubset<T, DisputeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disputes and returns the data updated in the database.
     * @param {DisputeUpdateManyAndReturnArgs} args - Arguments to update many Disputes.
     * @example
     * // Update many Disputes
     * const dispute = await prisma.dispute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Disputes and only return the `id`
     * const disputeWithIdOnly = await prisma.dispute.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DisputeUpdateManyAndReturnArgs>(args: SelectSubset<T, DisputeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dispute.
     * @param {DisputeUpsertArgs} args - Arguments to update or create a Dispute.
     * @example
     * // Update or create a Dispute
     * const dispute = await prisma.dispute.upsert({
     *   create: {
     *     // ... data to create a Dispute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dispute we want to update
     *   }
     * })
     */
    upsert<T extends DisputeUpsertArgs>(args: SelectSubset<T, DisputeUpsertArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Disputes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeCountArgs} args - Arguments to filter Disputes to count.
     * @example
     * // Count the number of Disputes
     * const count = await prisma.dispute.count({
     *   where: {
     *     // ... the filter for the Disputes we want to count
     *   }
     * })
    **/
    count<T extends DisputeCountArgs>(
      args?: Subset<T, DisputeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisputeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dispute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisputeAggregateArgs>(args: Subset<T, DisputeAggregateArgs>): Prisma.PrismaPromise<GetDisputeAggregateType<T>>

    /**
     * Group by Dispute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisputeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisputeGroupByArgs['orderBy'] }
        : { orderBy?: DisputeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisputeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisputeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dispute model
   */
  readonly fields: DisputeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dispute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisputeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dispute model
   */
  interface DisputeFieldRefs {
    readonly id: FieldRef<"Dispute", 'String'>
    readonly userId: FieldRef<"Dispute", 'String'>
    readonly documentId: FieldRef<"Dispute", 'String'>
    readonly category: FieldRef<"Dispute", 'DisputeCategory'>
    readonly explanation: FieldRef<"Dispute", 'String'>
    readonly status: FieldRef<"Dispute", 'DisputeStatus'>
    readonly createdAt: FieldRef<"Dispute", 'DateTime'>
    readonly updatedAt: FieldRef<"Dispute", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dispute findUnique
   */
  export type DisputeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute findUniqueOrThrow
   */
  export type DisputeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute findFirst
   */
  export type DisputeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disputes.
     */
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute findFirstOrThrow
   */
  export type DisputeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disputes.
     */
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute findMany
   */
  export type DisputeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Disputes to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute create
   */
  export type DisputeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The data needed to create a Dispute.
     */
    data: XOR<DisputeCreateInput, DisputeUncheckedCreateInput>
  }

  /**
   * Dispute createMany
   */
  export type DisputeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Disputes.
     */
    data: DisputeCreateManyInput | DisputeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dispute createManyAndReturn
   */
  export type DisputeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * The data used to create many Disputes.
     */
    data: DisputeCreateManyInput | DisputeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dispute update
   */
  export type DisputeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The data needed to update a Dispute.
     */
    data: XOR<DisputeUpdateInput, DisputeUncheckedUpdateInput>
    /**
     * Choose, which Dispute to update.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute updateMany
   */
  export type DisputeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Disputes.
     */
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyInput>
    /**
     * Filter which Disputes to update
     */
    where?: DisputeWhereInput
    /**
     * Limit how many Disputes to update.
     */
    limit?: number
  }

  /**
   * Dispute updateManyAndReturn
   */
  export type DisputeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * The data used to update Disputes.
     */
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyInput>
    /**
     * Filter which Disputes to update
     */
    where?: DisputeWhereInput
    /**
     * Limit how many Disputes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dispute upsert
   */
  export type DisputeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The filter to search for the Dispute to update in case it exists.
     */
    where: DisputeWhereUniqueInput
    /**
     * In case the Dispute found by the `where` argument doesn't exist, create a new Dispute with this data.
     */
    create: XOR<DisputeCreateInput, DisputeUncheckedCreateInput>
    /**
     * In case the Dispute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisputeUpdateInput, DisputeUncheckedUpdateInput>
  }

  /**
   * Dispute delete
   */
  export type DisputeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter which Dispute to delete.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute deleteMany
   */
  export type DisputeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disputes to delete
     */
    where?: DisputeWhereInput
    /**
     * Limit how many Disputes to delete.
     */
    limit?: number
  }

  /**
   * Dispute without action
   */
  export type DisputeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dispute
     */
    omit?: DisputeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
  }


  /**
   * Model DocumentStatusHistory
   */

  export type AggregateDocumentStatusHistory = {
    _count: DocumentStatusHistoryCountAggregateOutputType | null
    _min: DocumentStatusHistoryMinAggregateOutputType | null
    _max: DocumentStatusHistoryMaxAggregateOutputType | null
  }

  export type DocumentStatusHistoryMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    status: $Enums.DocumentStatus | null
    changedById: string | null
    createdAt: Date | null
  }

  export type DocumentStatusHistoryMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    status: $Enums.DocumentStatus | null
    changedById: string | null
    createdAt: Date | null
  }

  export type DocumentStatusHistoryCountAggregateOutputType = {
    id: number
    documentId: number
    status: number
    changedById: number
    createdAt: number
    _all: number
  }


  export type DocumentStatusHistoryMinAggregateInputType = {
    id?: true
    documentId?: true
    status?: true
    changedById?: true
    createdAt?: true
  }

  export type DocumentStatusHistoryMaxAggregateInputType = {
    id?: true
    documentId?: true
    status?: true
    changedById?: true
    createdAt?: true
  }

  export type DocumentStatusHistoryCountAggregateInputType = {
    id?: true
    documentId?: true
    status?: true
    changedById?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentStatusHistory to aggregate.
     */
    where?: DocumentStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentStatusHistories to fetch.
     */
    orderBy?: DocumentStatusHistoryOrderByWithRelationInput | DocumentStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentStatusHistories
    **/
    _count?: true | DocumentStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentStatusHistoryMaxAggregateInputType
  }

  export type GetDocumentStatusHistoryAggregateType<T extends DocumentStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentStatusHistory[P]>
      : GetScalarType<T[P], AggregateDocumentStatusHistory[P]>
  }




  export type DocumentStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentStatusHistoryWhereInput
    orderBy?: DocumentStatusHistoryOrderByWithAggregationInput | DocumentStatusHistoryOrderByWithAggregationInput[]
    by: DocumentStatusHistoryScalarFieldEnum[] | DocumentStatusHistoryScalarFieldEnum
    having?: DocumentStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentStatusHistoryCountAggregateInputType | true
    _min?: DocumentStatusHistoryMinAggregateInputType
    _max?: DocumentStatusHistoryMaxAggregateInputType
  }

  export type DocumentStatusHistoryGroupByOutputType = {
    id: string
    documentId: string
    status: $Enums.DocumentStatus
    changedById: string | null
    createdAt: Date
    _count: DocumentStatusHistoryCountAggregateOutputType | null
    _min: DocumentStatusHistoryMinAggregateOutputType | null
    _max: DocumentStatusHistoryMaxAggregateOutputType | null
  }

  type GetDocumentStatusHistoryGroupByPayload<T extends DocumentStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type DocumentStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    status?: boolean
    changedById?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    changedBy?: boolean | DocumentStatusHistory$changedByArgs<ExtArgs>
  }, ExtArgs["result"]["documentStatusHistory"]>

  export type DocumentStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    status?: boolean
    changedById?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    changedBy?: boolean | DocumentStatusHistory$changedByArgs<ExtArgs>
  }, ExtArgs["result"]["documentStatusHistory"]>

  export type DocumentStatusHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    status?: boolean
    changedById?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    changedBy?: boolean | DocumentStatusHistory$changedByArgs<ExtArgs>
  }, ExtArgs["result"]["documentStatusHistory"]>

  export type DocumentStatusHistorySelectScalar = {
    id?: boolean
    documentId?: boolean
    status?: boolean
    changedById?: boolean
    createdAt?: boolean
  }

  export type DocumentStatusHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "status" | "changedById" | "createdAt", ExtArgs["result"]["documentStatusHistory"]>
  export type DocumentStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    changedBy?: boolean | DocumentStatusHistory$changedByArgs<ExtArgs>
  }
  export type DocumentStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    changedBy?: boolean | DocumentStatusHistory$changedByArgs<ExtArgs>
  }
  export type DocumentStatusHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    changedBy?: boolean | DocumentStatusHistory$changedByArgs<ExtArgs>
  }

  export type $DocumentStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentStatusHistory"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
      changedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      status: $Enums.DocumentStatus
      changedById: string | null
      createdAt: Date
    }, ExtArgs["result"]["documentStatusHistory"]>
    composites: {}
  }

  type DocumentStatusHistoryGetPayload<S extends boolean | null | undefined | DocumentStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$DocumentStatusHistoryPayload, S>

  type DocumentStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentStatusHistoryCountAggregateInputType | true
    }

  export interface DocumentStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentStatusHistory'], meta: { name: 'DocumentStatusHistory' } }
    /**
     * Find zero or one DocumentStatusHistory that matches the filter.
     * @param {DocumentStatusHistoryFindUniqueArgs} args - Arguments to find a DocumentStatusHistory
     * @example
     * // Get one DocumentStatusHistory
     * const documentStatusHistory = await prisma.documentStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentStatusHistoryFindUniqueArgs>(args: SelectSubset<T, DocumentStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentStatusHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a DocumentStatusHistory
     * @example
     * // Get one DocumentStatusHistory
     * const documentStatusHistory = await prisma.documentStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentStatusHistoryFindFirstArgs} args - Arguments to find a DocumentStatusHistory
     * @example
     * // Get one DocumentStatusHistory
     * const documentStatusHistory = await prisma.documentStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentStatusHistoryFindFirstArgs>(args?: SelectSubset<T, DocumentStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a DocumentStatusHistory
     * @example
     * // Get one DocumentStatusHistory
     * const documentStatusHistory = await prisma.documentStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentStatusHistories
     * const documentStatusHistories = await prisma.documentStatusHistory.findMany()
     * 
     * // Get first 10 DocumentStatusHistories
     * const documentStatusHistories = await prisma.documentStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentStatusHistoryWithIdOnly = await prisma.documentStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentStatusHistoryFindManyArgs>(args?: SelectSubset<T, DocumentStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentStatusHistory.
     * @param {DocumentStatusHistoryCreateArgs} args - Arguments to create a DocumentStatusHistory.
     * @example
     * // Create one DocumentStatusHistory
     * const DocumentStatusHistory = await prisma.documentStatusHistory.create({
     *   data: {
     *     // ... data to create a DocumentStatusHistory
     *   }
     * })
     * 
     */
    create<T extends DocumentStatusHistoryCreateArgs>(args: SelectSubset<T, DocumentStatusHistoryCreateArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentStatusHistories.
     * @param {DocumentStatusHistoryCreateManyArgs} args - Arguments to create many DocumentStatusHistories.
     * @example
     * // Create many DocumentStatusHistories
     * const documentStatusHistory = await prisma.documentStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentStatusHistoryCreateManyArgs>(args?: SelectSubset<T, DocumentStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentStatusHistories and returns the data saved in the database.
     * @param {DocumentStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many DocumentStatusHistories.
     * @example
     * // Create many DocumentStatusHistories
     * const documentStatusHistory = await prisma.documentStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentStatusHistories and only return the `id`
     * const documentStatusHistoryWithIdOnly = await prisma.documentStatusHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentStatusHistory.
     * @param {DocumentStatusHistoryDeleteArgs} args - Arguments to delete one DocumentStatusHistory.
     * @example
     * // Delete one DocumentStatusHistory
     * const DocumentStatusHistory = await prisma.documentStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one DocumentStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends DocumentStatusHistoryDeleteArgs>(args: SelectSubset<T, DocumentStatusHistoryDeleteArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentStatusHistory.
     * @param {DocumentStatusHistoryUpdateArgs} args - Arguments to update one DocumentStatusHistory.
     * @example
     * // Update one DocumentStatusHistory
     * const documentStatusHistory = await prisma.documentStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentStatusHistoryUpdateArgs>(args: SelectSubset<T, DocumentStatusHistoryUpdateArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentStatusHistories.
     * @param {DocumentStatusHistoryDeleteManyArgs} args - Arguments to filter DocumentStatusHistories to delete.
     * @example
     * // Delete a few DocumentStatusHistories
     * const { count } = await prisma.documentStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, DocumentStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentStatusHistories
     * const documentStatusHistory = await prisma.documentStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentStatusHistoryUpdateManyArgs>(args: SelectSubset<T, DocumentStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentStatusHistories and returns the data updated in the database.
     * @param {DocumentStatusHistoryUpdateManyAndReturnArgs} args - Arguments to update many DocumentStatusHistories.
     * @example
     * // Update many DocumentStatusHistories
     * const documentStatusHistory = await prisma.documentStatusHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentStatusHistories and only return the `id`
     * const documentStatusHistoryWithIdOnly = await prisma.documentStatusHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentStatusHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentStatusHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentStatusHistory.
     * @param {DocumentStatusHistoryUpsertArgs} args - Arguments to update or create a DocumentStatusHistory.
     * @example
     * // Update or create a DocumentStatusHistory
     * const documentStatusHistory = await prisma.documentStatusHistory.upsert({
     *   create: {
     *     // ... data to create a DocumentStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends DocumentStatusHistoryUpsertArgs>(args: SelectSubset<T, DocumentStatusHistoryUpsertArgs<ExtArgs>>): Prisma__DocumentStatusHistoryClient<$Result.GetResult<Prisma.$DocumentStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentStatusHistoryCountArgs} args - Arguments to filter DocumentStatusHistories to count.
     * @example
     * // Count the number of DocumentStatusHistories
     * const count = await prisma.documentStatusHistory.count({
     *   where: {
     *     // ... the filter for the DocumentStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends DocumentStatusHistoryCountArgs>(
      args?: Subset<T, DocumentStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentStatusHistoryAggregateArgs>(args: Subset<T, DocumentStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetDocumentStatusHistoryAggregateType<T>>

    /**
     * Group by DocumentStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentStatusHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: DocumentStatusHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentStatusHistory model
   */
  readonly fields: DocumentStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    changedBy<T extends DocumentStatusHistory$changedByArgs<ExtArgs> = {}>(args?: Subset<T, DocumentStatusHistory$changedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentStatusHistory model
   */
  interface DocumentStatusHistoryFieldRefs {
    readonly id: FieldRef<"DocumentStatusHistory", 'String'>
    readonly documentId: FieldRef<"DocumentStatusHistory", 'String'>
    readonly status: FieldRef<"DocumentStatusHistory", 'DocumentStatus'>
    readonly changedById: FieldRef<"DocumentStatusHistory", 'String'>
    readonly createdAt: FieldRef<"DocumentStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentStatusHistory findUnique
   */
  export type DocumentStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DocumentStatusHistory to fetch.
     */
    where: DocumentStatusHistoryWhereUniqueInput
  }

  /**
   * DocumentStatusHistory findUniqueOrThrow
   */
  export type DocumentStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DocumentStatusHistory to fetch.
     */
    where: DocumentStatusHistoryWhereUniqueInput
  }

  /**
   * DocumentStatusHistory findFirst
   */
  export type DocumentStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DocumentStatusHistory to fetch.
     */
    where?: DocumentStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentStatusHistories to fetch.
     */
    orderBy?: DocumentStatusHistoryOrderByWithRelationInput | DocumentStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentStatusHistories.
     */
    cursor?: DocumentStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentStatusHistories.
     */
    distinct?: DocumentStatusHistoryScalarFieldEnum | DocumentStatusHistoryScalarFieldEnum[]
  }

  /**
   * DocumentStatusHistory findFirstOrThrow
   */
  export type DocumentStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DocumentStatusHistory to fetch.
     */
    where?: DocumentStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentStatusHistories to fetch.
     */
    orderBy?: DocumentStatusHistoryOrderByWithRelationInput | DocumentStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentStatusHistories.
     */
    cursor?: DocumentStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentStatusHistories.
     */
    distinct?: DocumentStatusHistoryScalarFieldEnum | DocumentStatusHistoryScalarFieldEnum[]
  }

  /**
   * DocumentStatusHistory findMany
   */
  export type DocumentStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DocumentStatusHistories to fetch.
     */
    where?: DocumentStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentStatusHistories to fetch.
     */
    orderBy?: DocumentStatusHistoryOrderByWithRelationInput | DocumentStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentStatusHistories.
     */
    cursor?: DocumentStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentStatusHistories.
     */
    skip?: number
    distinct?: DocumentStatusHistoryScalarFieldEnum | DocumentStatusHistoryScalarFieldEnum[]
  }

  /**
   * DocumentStatusHistory create
   */
  export type DocumentStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentStatusHistory.
     */
    data: XOR<DocumentStatusHistoryCreateInput, DocumentStatusHistoryUncheckedCreateInput>
  }

  /**
   * DocumentStatusHistory createMany
   */
  export type DocumentStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentStatusHistories.
     */
    data: DocumentStatusHistoryCreateManyInput | DocumentStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentStatusHistory createManyAndReturn
   */
  export type DocumentStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentStatusHistories.
     */
    data: DocumentStatusHistoryCreateManyInput | DocumentStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentStatusHistory update
   */
  export type DocumentStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentStatusHistory.
     */
    data: XOR<DocumentStatusHistoryUpdateInput, DocumentStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which DocumentStatusHistory to update.
     */
    where: DocumentStatusHistoryWhereUniqueInput
  }

  /**
   * DocumentStatusHistory updateMany
   */
  export type DocumentStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentStatusHistories.
     */
    data: XOR<DocumentStatusHistoryUpdateManyMutationInput, DocumentStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DocumentStatusHistories to update
     */
    where?: DocumentStatusHistoryWhereInput
    /**
     * Limit how many DocumentStatusHistories to update.
     */
    limit?: number
  }

  /**
   * DocumentStatusHistory updateManyAndReturn
   */
  export type DocumentStatusHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to update DocumentStatusHistories.
     */
    data: XOR<DocumentStatusHistoryUpdateManyMutationInput, DocumentStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DocumentStatusHistories to update
     */
    where?: DocumentStatusHistoryWhereInput
    /**
     * Limit how many DocumentStatusHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentStatusHistory upsert
   */
  export type DocumentStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentStatusHistory to update in case it exists.
     */
    where: DocumentStatusHistoryWhereUniqueInput
    /**
     * In case the DocumentStatusHistory found by the `where` argument doesn't exist, create a new DocumentStatusHistory with this data.
     */
    create: XOR<DocumentStatusHistoryCreateInput, DocumentStatusHistoryUncheckedCreateInput>
    /**
     * In case the DocumentStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentStatusHistoryUpdateInput, DocumentStatusHistoryUncheckedUpdateInput>
  }

  /**
   * DocumentStatusHistory delete
   */
  export type DocumentStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which DocumentStatusHistory to delete.
     */
    where: DocumentStatusHistoryWhereUniqueInput
  }

  /**
   * DocumentStatusHistory deleteMany
   */
  export type DocumentStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentStatusHistories to delete
     */
    where?: DocumentStatusHistoryWhereInput
    /**
     * Limit how many DocumentStatusHistories to delete.
     */
    limit?: number
  }

  /**
   * DocumentStatusHistory.changedBy
   */
  export type DocumentStatusHistory$changedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * DocumentStatusHistory without action
   */
  export type DocumentStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentStatusHistory
     */
    select?: DocumentStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentStatusHistory
     */
    omit?: DocumentStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    phone: 'phone',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dateOfBirth: 'dateOfBirth',
    documentNumber: 'documentNumber',
    foundLocation: 'foundLocation',
    foundDistrict: 'foundDistrict',
    foundDivision: 'foundDivision',
    foundSubLocation: 'foundSubLocation',
    dateFound: 'dateFound',
    condition: 'condition',
    kioskId: 'kioskId',
    posterId: 'posterId',
    claimedById: 'claimedById',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    expiredAt: 'expiredAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const KioskScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    phone: 'phone',
    hours: 'hours',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KioskScalarFieldEnum = (typeof KioskScalarFieldEnum)[keyof typeof KioskScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    documentId: 'documentId',
    type: 'type',
    channel: 'channel',
    message: 'message',
    sent: 'sent',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const DisputeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    documentId: 'documentId',
    category: 'category',
    explanation: 'explanation',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DisputeScalarFieldEnum = (typeof DisputeScalarFieldEnum)[keyof typeof DisputeScalarFieldEnum]


  export const DocumentStatusHistoryScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    status: 'status',
    changedById: 'changedById',
    createdAt: 'createdAt'
  };

  export type DocumentStatusHistoryScalarFieldEnum = (typeof DocumentStatusHistoryScalarFieldEnum)[keyof typeof DocumentStatusHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Condition'
   */
  export type EnumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Condition'>
    


  /**
   * Reference to a field of type 'Condition[]'
   */
  export type ListEnumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Condition[]'>
    


  /**
   * Reference to a field of type 'DocumentStatus'
   */
  export type EnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus'>
    


  /**
   * Reference to a field of type 'DocumentStatus[]'
   */
  export type ListEnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'NotificationChannel'
   */
  export type EnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel'>
    


  /**
   * Reference to a field of type 'NotificationChannel[]'
   */
  export type ListEnumNotificationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationChannel[]'>
    


  /**
   * Reference to a field of type 'DisputeCategory'
   */
  export type EnumDisputeCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeCategory'>
    


  /**
   * Reference to a field of type 'DisputeCategory[]'
   */
  export type ListEnumDisputeCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeCategory[]'>
    


  /**
   * Reference to a field of type 'DisputeStatus'
   */
  export type EnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus'>
    


  /**
   * Reference to a field of type 'DisputeStatus[]'
   */
  export type ListEnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
    claims?: DocumentListRelationFilter
    disputes?: DisputeListRelationFilter
    managedKiosks?: KioskListRelationFilter
    notifications?: NotificationListRelationFilter
    statusChanges?: DocumentStatusHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
    claims?: DocumentOrderByRelationAggregateInput
    disputes?: DisputeOrderByRelationAggregateInput
    managedKiosks?: KioskOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    statusChanges?: DocumentStatusHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
    claims?: DocumentListRelationFilter
    disputes?: DisputeListRelationFilter
    managedKiosks?: KioskListRelationFilter
    notifications?: NotificationListRelationFilter
    statusChanges?: DocumentStatusHistoryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    firstName?: StringFilter<"Document"> | string
    middleName?: StringNullableFilter<"Document"> | string | null
    lastName?: StringFilter<"Document"> | string
    dateOfBirth?: DateTimeFilter<"Document"> | Date | string
    documentNumber?: StringFilter<"Document"> | string
    foundLocation?: StringFilter<"Document"> | string
    foundDistrict?: StringFilter<"Document"> | string
    foundDivision?: StringFilter<"Document"> | string
    foundSubLocation?: StringFilter<"Document"> | string
    dateFound?: DateTimeFilter<"Document"> | Date | string
    condition?: EnumConditionFilter<"Document"> | $Enums.Condition
    kioskId?: StringFilter<"Document"> | string
    posterId?: StringFilter<"Document"> | string
    claimedById?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    expiredAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    kiosk?: XOR<KioskScalarRelationFilter, KioskWhereInput>
    poster?: XOR<UserScalarRelationFilter, UserWhereInput>
    claimedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    statusHistory?: DocumentStatusHistoryListRelationFilter
    notifications?: NotificationListRelationFilter
    disputes?: DisputeListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    documentNumber?: SortOrder
    foundLocation?: SortOrder
    foundDistrict?: SortOrder
    foundDivision?: SortOrder
    foundSubLocation?: SortOrder
    dateFound?: SortOrder
    condition?: SortOrder
    kioskId?: SortOrder
    posterId?: SortOrder
    claimedById?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiredAt?: SortOrderInput | SortOrder
    kiosk?: KioskOrderByWithRelationInput
    poster?: UserOrderByWithRelationInput
    claimedBy?: UserOrderByWithRelationInput
    statusHistory?: DocumentStatusHistoryOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    disputes?: DisputeOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    firstName?: StringFilter<"Document"> | string
    middleName?: StringNullableFilter<"Document"> | string | null
    lastName?: StringFilter<"Document"> | string
    dateOfBirth?: DateTimeFilter<"Document"> | Date | string
    documentNumber?: StringFilter<"Document"> | string
    foundLocation?: StringFilter<"Document"> | string
    foundDistrict?: StringFilter<"Document"> | string
    foundDivision?: StringFilter<"Document"> | string
    foundSubLocation?: StringFilter<"Document"> | string
    dateFound?: DateTimeFilter<"Document"> | Date | string
    condition?: EnumConditionFilter<"Document"> | $Enums.Condition
    kioskId?: StringFilter<"Document"> | string
    posterId?: StringFilter<"Document"> | string
    claimedById?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    expiredAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    kiosk?: XOR<KioskScalarRelationFilter, KioskWhereInput>
    poster?: XOR<UserScalarRelationFilter, UserWhereInput>
    claimedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    statusHistory?: DocumentStatusHistoryListRelationFilter
    notifications?: NotificationListRelationFilter
    disputes?: DisputeListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    documentNumber?: SortOrder
    foundLocation?: SortOrder
    foundDistrict?: SortOrder
    foundDivision?: SortOrder
    foundSubLocation?: SortOrder
    dateFound?: SortOrder
    condition?: SortOrder
    kioskId?: SortOrder
    posterId?: SortOrder
    claimedById?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiredAt?: SortOrderInput | SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    firstName?: StringWithAggregatesFilter<"Document"> | string
    middleName?: StringNullableWithAggregatesFilter<"Document"> | string | null
    lastName?: StringWithAggregatesFilter<"Document"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    documentNumber?: StringWithAggregatesFilter<"Document"> | string
    foundLocation?: StringWithAggregatesFilter<"Document"> | string
    foundDistrict?: StringWithAggregatesFilter<"Document"> | string
    foundDivision?: StringWithAggregatesFilter<"Document"> | string
    foundSubLocation?: StringWithAggregatesFilter<"Document"> | string
    dateFound?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    condition?: EnumConditionWithAggregatesFilter<"Document"> | $Enums.Condition
    kioskId?: StringWithAggregatesFilter<"Document"> | string
    posterId?: StringWithAggregatesFilter<"Document"> | string
    claimedById?: StringNullableWithAggregatesFilter<"Document"> | string | null
    status?: EnumDocumentStatusWithAggregatesFilter<"Document"> | $Enums.DocumentStatus
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    expiredAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
  }

  export type KioskWhereInput = {
    AND?: KioskWhereInput | KioskWhereInput[]
    OR?: KioskWhereInput[]
    NOT?: KioskWhereInput | KioskWhereInput[]
    id?: StringFilter<"Kiosk"> | string
    name?: StringFilter<"Kiosk"> | string
    location?: StringFilter<"Kiosk"> | string
    phone?: StringFilter<"Kiosk"> | string
    hours?: StringNullableFilter<"Kiosk"> | string | null
    isActive?: BoolFilter<"Kiosk"> | boolean
    createdAt?: DateTimeFilter<"Kiosk"> | Date | string
    updatedAt?: DateTimeFilter<"Kiosk"> | Date | string
    documents?: DocumentListRelationFilter
    managers?: UserListRelationFilter
  }

  export type KioskOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    hours?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
    managers?: UserOrderByRelationAggregateInput
  }

  export type KioskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KioskWhereInput | KioskWhereInput[]
    OR?: KioskWhereInput[]
    NOT?: KioskWhereInput | KioskWhereInput[]
    name?: StringFilter<"Kiosk"> | string
    location?: StringFilter<"Kiosk"> | string
    phone?: StringFilter<"Kiosk"> | string
    hours?: StringNullableFilter<"Kiosk"> | string | null
    isActive?: BoolFilter<"Kiosk"> | boolean
    createdAt?: DateTimeFilter<"Kiosk"> | Date | string
    updatedAt?: DateTimeFilter<"Kiosk"> | Date | string
    documents?: DocumentListRelationFilter
    managers?: UserListRelationFilter
  }, "id">

  export type KioskOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    hours?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KioskCountOrderByAggregateInput
    _max?: KioskMaxOrderByAggregateInput
    _min?: KioskMinOrderByAggregateInput
  }

  export type KioskScalarWhereWithAggregatesInput = {
    AND?: KioskScalarWhereWithAggregatesInput | KioskScalarWhereWithAggregatesInput[]
    OR?: KioskScalarWhereWithAggregatesInput[]
    NOT?: KioskScalarWhereWithAggregatesInput | KioskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Kiosk"> | string
    name?: StringWithAggregatesFilter<"Kiosk"> | string
    location?: StringWithAggregatesFilter<"Kiosk"> | string
    phone?: StringWithAggregatesFilter<"Kiosk"> | string
    hours?: StringNullableWithAggregatesFilter<"Kiosk"> | string | null
    isActive?: BoolWithAggregatesFilter<"Kiosk"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Kiosk"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Kiosk"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringNullableFilter<"Notification"> | string | null
    documentId?: StringNullableFilter<"Notification"> | string | null
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    channel?: EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel
    message?: StringFilter<"Notification"> | string
    sent?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    document?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    documentId?: SortOrderInput | SortOrder
    type?: SortOrder
    channel?: SortOrder
    message?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    document?: DocumentOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringNullableFilter<"Notification"> | string | null
    documentId?: StringNullableFilter<"Notification"> | string | null
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    channel?: EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel
    message?: StringFilter<"Notification"> | string
    sent?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    document?: XOR<DocumentNullableScalarRelationFilter, DocumentWhereInput> | null
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    documentId?: SortOrderInput | SortOrder
    type?: SortOrder
    channel?: SortOrder
    message?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    documentId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    channel?: EnumNotificationChannelWithAggregatesFilter<"Notification"> | $Enums.NotificationChannel
    message?: StringWithAggregatesFilter<"Notification"> | string
    sent?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type DisputeWhereInput = {
    AND?: DisputeWhereInput | DisputeWhereInput[]
    OR?: DisputeWhereInput[]
    NOT?: DisputeWhereInput | DisputeWhereInput[]
    id?: StringFilter<"Dispute"> | string
    userId?: StringFilter<"Dispute"> | string
    documentId?: StringFilter<"Dispute"> | string
    category?: EnumDisputeCategoryFilter<"Dispute"> | $Enums.DisputeCategory
    explanation?: StringNullableFilter<"Dispute"> | string | null
    status?: EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type DisputeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    category?: SortOrder
    explanation?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    document?: DocumentOrderByWithRelationInput
  }

  export type DisputeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DisputeWhereInput | DisputeWhereInput[]
    OR?: DisputeWhereInput[]
    NOT?: DisputeWhereInput | DisputeWhereInput[]
    userId?: StringFilter<"Dispute"> | string
    documentId?: StringFilter<"Dispute"> | string
    category?: EnumDisputeCategoryFilter<"Dispute"> | $Enums.DisputeCategory
    explanation?: StringNullableFilter<"Dispute"> | string | null
    status?: EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id">

  export type DisputeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    category?: SortOrder
    explanation?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DisputeCountOrderByAggregateInput
    _max?: DisputeMaxOrderByAggregateInput
    _min?: DisputeMinOrderByAggregateInput
  }

  export type DisputeScalarWhereWithAggregatesInput = {
    AND?: DisputeScalarWhereWithAggregatesInput | DisputeScalarWhereWithAggregatesInput[]
    OR?: DisputeScalarWhereWithAggregatesInput[]
    NOT?: DisputeScalarWhereWithAggregatesInput | DisputeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dispute"> | string
    userId?: StringWithAggregatesFilter<"Dispute"> | string
    documentId?: StringWithAggregatesFilter<"Dispute"> | string
    category?: EnumDisputeCategoryWithAggregatesFilter<"Dispute"> | $Enums.DisputeCategory
    explanation?: StringNullableWithAggregatesFilter<"Dispute"> | string | null
    status?: EnumDisputeStatusWithAggregatesFilter<"Dispute"> | $Enums.DisputeStatus
    createdAt?: DateTimeWithAggregatesFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dispute"> | Date | string
  }

  export type DocumentStatusHistoryWhereInput = {
    AND?: DocumentStatusHistoryWhereInput | DocumentStatusHistoryWhereInput[]
    OR?: DocumentStatusHistoryWhereInput[]
    NOT?: DocumentStatusHistoryWhereInput | DocumentStatusHistoryWhereInput[]
    id?: StringFilter<"DocumentStatusHistory"> | string
    documentId?: StringFilter<"DocumentStatusHistory"> | string
    status?: EnumDocumentStatusFilter<"DocumentStatusHistory"> | $Enums.DocumentStatus
    changedById?: StringNullableFilter<"DocumentStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"DocumentStatusHistory"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    changedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type DocumentStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    status?: SortOrder
    changedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
    changedBy?: UserOrderByWithRelationInput
  }

  export type DocumentStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentStatusHistoryWhereInput | DocumentStatusHistoryWhereInput[]
    OR?: DocumentStatusHistoryWhereInput[]
    NOT?: DocumentStatusHistoryWhereInput | DocumentStatusHistoryWhereInput[]
    documentId?: StringFilter<"DocumentStatusHistory"> | string
    status?: EnumDocumentStatusFilter<"DocumentStatusHistory"> | $Enums.DocumentStatus
    changedById?: StringNullableFilter<"DocumentStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"DocumentStatusHistory"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    changedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type DocumentStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    status?: SortOrder
    changedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DocumentStatusHistoryCountOrderByAggregateInput
    _max?: DocumentStatusHistoryMaxOrderByAggregateInput
    _min?: DocumentStatusHistoryMinOrderByAggregateInput
  }

  export type DocumentStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: DocumentStatusHistoryScalarWhereWithAggregatesInput | DocumentStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: DocumentStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: DocumentStatusHistoryScalarWhereWithAggregatesInput | DocumentStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentStatusHistory"> | string
    documentId?: StringWithAggregatesFilter<"DocumentStatusHistory"> | string
    status?: EnumDocumentStatusWithAggregatesFilter<"DocumentStatusHistory"> | $Enums.DocumentStatus
    changedById?: StringNullableWithAggregatesFilter<"DocumentStatusHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DocumentStatusHistory"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutPosterInput
    claims?: DocumentCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeCreateNestedManyWithoutUserInput
    managedKiosks?: KioskCreateNestedManyWithoutManagersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutPosterInput
    claims?: DocumentUncheckedCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutUserInput
    managedKiosks?: KioskUncheckedCreateNestedManyWithoutManagersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutPosterNestedInput
    claims?: DocumentUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutPosterNestedInput
    claims?: DocumentUncheckedUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUncheckedUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    kiosk: KioskCreateNestedOneWithoutDocumentsInput
    poster: UserCreateNestedOneWithoutDocumentsInput
    claimedBy?: UserCreateNestedOneWithoutClaimsInput
    statusHistory?: DocumentStatusHistoryCreateNestedManyWithoutDocumentInput
    notifications?: NotificationCreateNestedManyWithoutDocumentInput
    disputes?: DisputeCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutDocumentInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutDocumentInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kiosk?: KioskUpdateOneRequiredWithoutDocumentsNestedInput
    poster?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    claimedBy?: UserUpdateOneWithoutClaimsNestedInput
    statusHistory?: DocumentStatusHistoryUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type KioskCreateInput = {
    id?: string
    name: string
    location: string
    phone: string
    hours?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutKioskInput
    managers?: UserCreateNestedManyWithoutManagedKiosksInput
  }

  export type KioskUncheckedCreateInput = {
    id?: string
    name: string
    location: string
    phone: string
    hours?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutKioskInput
    managers?: UserUncheckedCreateNestedManyWithoutManagedKiosksInput
  }

  export type KioskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutKioskNestedInput
    managers?: UserUpdateManyWithoutManagedKiosksNestedInput
  }

  export type KioskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutKioskNestedInput
    managers?: UserUncheckedUpdateManyWithoutManagedKiosksNestedInput
  }

  export type KioskCreateManyInput = {
    id?: string
    name: string
    location: string
    phone: string
    hours?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KioskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KioskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutNotificationsInput
    document?: DocumentCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId?: string | null
    documentId?: string | null
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutNotificationsNestedInput
    document?: DocumentUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId?: string | null
    documentId?: string | null
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeCreateInput = {
    id?: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDisputesInput
    document: DocumentCreateNestedOneWithoutDisputesInput
  }

  export type DisputeUncheckedCreateInput = {
    id?: string
    userId: string
    documentId: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDisputesNestedInput
    document?: DocumentUpdateOneRequiredWithoutDisputesNestedInput
  }

  export type DisputeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeCreateManyInput = {
    id?: string
    userId: string
    documentId: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentStatusHistoryCreateInput = {
    id?: string
    status: $Enums.DocumentStatus
    createdAt?: Date | string
    document: DocumentCreateNestedOneWithoutStatusHistoryInput
    changedBy?: UserCreateNestedOneWithoutStatusChangesInput
  }

  export type DocumentStatusHistoryUncheckedCreateInput = {
    id?: string
    documentId: string
    status: $Enums.DocumentStatus
    changedById?: string | null
    createdAt?: Date | string
  }

  export type DocumentStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutStatusHistoryNestedInput
    changedBy?: UserUpdateOneWithoutStatusChangesNestedInput
  }

  export type DocumentStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    changedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentStatusHistoryCreateManyInput = {
    id?: string
    documentId: string
    status: $Enums.DocumentStatus
    changedById?: string | null
    createdAt?: Date | string
  }

  export type DocumentStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    changedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DisputeListRelationFilter = {
    every?: DisputeWhereInput
    some?: DisputeWhereInput
    none?: DisputeWhereInput
  }

  export type KioskListRelationFilter = {
    every?: KioskWhereInput
    some?: KioskWhereInput
    none?: KioskWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type DocumentStatusHistoryListRelationFilter = {
    every?: DocumentStatusHistoryWhereInput
    some?: DocumentStatusHistoryWhereInput
    none?: DocumentStatusHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DisputeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KioskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionFilter<$PrismaModel> | $Enums.Condition
  }

  export type EnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type KioskScalarRelationFilter = {
    is?: KioskWhereInput
    isNot?: KioskWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    documentNumber?: SortOrder
    foundLocation?: SortOrder
    foundDistrict?: SortOrder
    foundDivision?: SortOrder
    foundSubLocation?: SortOrder
    dateFound?: SortOrder
    condition?: SortOrder
    kioskId?: SortOrder
    posterId?: SortOrder
    claimedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiredAt?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    documentNumber?: SortOrder
    foundLocation?: SortOrder
    foundDistrict?: SortOrder
    foundDivision?: SortOrder
    foundSubLocation?: SortOrder
    dateFound?: SortOrder
    condition?: SortOrder
    kioskId?: SortOrder
    posterId?: SortOrder
    claimedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiredAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    documentNumber?: SortOrder
    foundLocation?: SortOrder
    foundDistrict?: SortOrder
    foundDivision?: SortOrder
    foundSubLocation?: SortOrder
    dateFound?: SortOrder
    condition?: SortOrder
    kioskId?: SortOrder
    posterId?: SortOrder
    claimedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiredAt?: SortOrder
  }

  export type EnumConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionWithAggregatesFilter<$PrismaModel> | $Enums.Condition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConditionFilter<$PrismaModel>
    _max?: NestedEnumConditionFilter<$PrismaModel>
  }

  export type EnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KioskCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    hours?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KioskMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    hours?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KioskMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    phone?: SortOrder
    hours?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type EnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type DocumentNullableScalarRelationFilter = {
    is?: DocumentWhereInput | null
    isNot?: DocumentWhereInput | null
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    type?: SortOrder
    channel?: SortOrder
    message?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    type?: SortOrder
    channel?: SortOrder
    message?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    type?: SortOrder
    channel?: SortOrder
    message?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type EnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type EnumDisputeCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeCategory | EnumDisputeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeCategoryFilter<$PrismaModel> | $Enums.DisputeCategory
  }

  export type EnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type DisputeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    category?: SortOrder
    explanation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DisputeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    category?: SortOrder
    explanation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DisputeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    category?: SortOrder
    explanation?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDisputeCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeCategory | EnumDisputeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeCategoryWithAggregatesFilter<$PrismaModel> | $Enums.DisputeCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisputeCategoryFilter<$PrismaModel>
    _max?: NestedEnumDisputeCategoryFilter<$PrismaModel>
  }

  export type EnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisputeStatusFilter<$PrismaModel>
    _max?: NestedEnumDisputeStatusFilter<$PrismaModel>
  }

  export type DocumentStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    status?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    status?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    status?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentCreateNestedManyWithoutPosterInput = {
    create?: XOR<DocumentCreateWithoutPosterInput, DocumentUncheckedCreateWithoutPosterInput> | DocumentCreateWithoutPosterInput[] | DocumentUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPosterInput | DocumentCreateOrConnectWithoutPosterInput[]
    createMany?: DocumentCreateManyPosterInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutClaimedByInput = {
    create?: XOR<DocumentCreateWithoutClaimedByInput, DocumentUncheckedCreateWithoutClaimedByInput> | DocumentCreateWithoutClaimedByInput[] | DocumentUncheckedCreateWithoutClaimedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutClaimedByInput | DocumentCreateOrConnectWithoutClaimedByInput[]
    createMany?: DocumentCreateManyClaimedByInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DisputeCreateNestedManyWithoutUserInput = {
    create?: XOR<DisputeCreateWithoutUserInput, DisputeUncheckedCreateWithoutUserInput> | DisputeCreateWithoutUserInput[] | DisputeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutUserInput | DisputeCreateOrConnectWithoutUserInput[]
    createMany?: DisputeCreateManyUserInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type KioskCreateNestedManyWithoutManagersInput = {
    create?: XOR<KioskCreateWithoutManagersInput, KioskUncheckedCreateWithoutManagersInput> | KioskCreateWithoutManagersInput[] | KioskUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: KioskCreateOrConnectWithoutManagersInput | KioskCreateOrConnectWithoutManagersInput[]
    connect?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type DocumentStatusHistoryCreateNestedManyWithoutChangedByInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutChangedByInput, DocumentStatusHistoryUncheckedCreateWithoutChangedByInput> | DocumentStatusHistoryCreateWithoutChangedByInput[] | DocumentStatusHistoryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutChangedByInput | DocumentStatusHistoryCreateOrConnectWithoutChangedByInput[]
    createMany?: DocumentStatusHistoryCreateManyChangedByInputEnvelope
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutPosterInput = {
    create?: XOR<DocumentCreateWithoutPosterInput, DocumentUncheckedCreateWithoutPosterInput> | DocumentCreateWithoutPosterInput[] | DocumentUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPosterInput | DocumentCreateOrConnectWithoutPosterInput[]
    createMany?: DocumentCreateManyPosterInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutClaimedByInput = {
    create?: XOR<DocumentCreateWithoutClaimedByInput, DocumentUncheckedCreateWithoutClaimedByInput> | DocumentCreateWithoutClaimedByInput[] | DocumentUncheckedCreateWithoutClaimedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutClaimedByInput | DocumentCreateOrConnectWithoutClaimedByInput[]
    createMany?: DocumentCreateManyClaimedByInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type DisputeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DisputeCreateWithoutUserInput, DisputeUncheckedCreateWithoutUserInput> | DisputeCreateWithoutUserInput[] | DisputeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutUserInput | DisputeCreateOrConnectWithoutUserInput[]
    createMany?: DisputeCreateManyUserInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type KioskUncheckedCreateNestedManyWithoutManagersInput = {
    create?: XOR<KioskCreateWithoutManagersInput, KioskUncheckedCreateWithoutManagersInput> | KioskCreateWithoutManagersInput[] | KioskUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: KioskCreateOrConnectWithoutManagersInput | KioskCreateOrConnectWithoutManagersInput[]
    connect?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type DocumentStatusHistoryUncheckedCreateNestedManyWithoutChangedByInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutChangedByInput, DocumentStatusHistoryUncheckedCreateWithoutChangedByInput> | DocumentStatusHistoryCreateWithoutChangedByInput[] | DocumentStatusHistoryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutChangedByInput | DocumentStatusHistoryCreateOrConnectWithoutChangedByInput[]
    createMany?: DocumentStatusHistoryCreateManyChangedByInputEnvelope
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DocumentUpdateManyWithoutPosterNestedInput = {
    create?: XOR<DocumentCreateWithoutPosterInput, DocumentUncheckedCreateWithoutPosterInput> | DocumentCreateWithoutPosterInput[] | DocumentUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPosterInput | DocumentCreateOrConnectWithoutPosterInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutPosterInput | DocumentUpsertWithWhereUniqueWithoutPosterInput[]
    createMany?: DocumentCreateManyPosterInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutPosterInput | DocumentUpdateWithWhereUniqueWithoutPosterInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutPosterInput | DocumentUpdateManyWithWhereWithoutPosterInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutClaimedByNestedInput = {
    create?: XOR<DocumentCreateWithoutClaimedByInput, DocumentUncheckedCreateWithoutClaimedByInput> | DocumentCreateWithoutClaimedByInput[] | DocumentUncheckedCreateWithoutClaimedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutClaimedByInput | DocumentCreateOrConnectWithoutClaimedByInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutClaimedByInput | DocumentUpsertWithWhereUniqueWithoutClaimedByInput[]
    createMany?: DocumentCreateManyClaimedByInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutClaimedByInput | DocumentUpdateWithWhereUniqueWithoutClaimedByInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutClaimedByInput | DocumentUpdateManyWithWhereWithoutClaimedByInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DisputeUpdateManyWithoutUserNestedInput = {
    create?: XOR<DisputeCreateWithoutUserInput, DisputeUncheckedCreateWithoutUserInput> | DisputeCreateWithoutUserInput[] | DisputeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutUserInput | DisputeCreateOrConnectWithoutUserInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutUserInput | DisputeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DisputeCreateManyUserInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutUserInput | DisputeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutUserInput | DisputeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type KioskUpdateManyWithoutManagersNestedInput = {
    create?: XOR<KioskCreateWithoutManagersInput, KioskUncheckedCreateWithoutManagersInput> | KioskCreateWithoutManagersInput[] | KioskUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: KioskCreateOrConnectWithoutManagersInput | KioskCreateOrConnectWithoutManagersInput[]
    upsert?: KioskUpsertWithWhereUniqueWithoutManagersInput | KioskUpsertWithWhereUniqueWithoutManagersInput[]
    set?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    disconnect?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    delete?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    connect?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    update?: KioskUpdateWithWhereUniqueWithoutManagersInput | KioskUpdateWithWhereUniqueWithoutManagersInput[]
    updateMany?: KioskUpdateManyWithWhereWithoutManagersInput | KioskUpdateManyWithWhereWithoutManagersInput[]
    deleteMany?: KioskScalarWhereInput | KioskScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type DocumentStatusHistoryUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutChangedByInput, DocumentStatusHistoryUncheckedCreateWithoutChangedByInput> | DocumentStatusHistoryCreateWithoutChangedByInput[] | DocumentStatusHistoryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutChangedByInput | DocumentStatusHistoryCreateOrConnectWithoutChangedByInput[]
    upsert?: DocumentStatusHistoryUpsertWithWhereUniqueWithoutChangedByInput | DocumentStatusHistoryUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: DocumentStatusHistoryCreateManyChangedByInputEnvelope
    set?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    disconnect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    delete?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    update?: DocumentStatusHistoryUpdateWithWhereUniqueWithoutChangedByInput | DocumentStatusHistoryUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: DocumentStatusHistoryUpdateManyWithWhereWithoutChangedByInput | DocumentStatusHistoryUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: DocumentStatusHistoryScalarWhereInput | DocumentStatusHistoryScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutPosterNestedInput = {
    create?: XOR<DocumentCreateWithoutPosterInput, DocumentUncheckedCreateWithoutPosterInput> | DocumentCreateWithoutPosterInput[] | DocumentUncheckedCreateWithoutPosterInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutPosterInput | DocumentCreateOrConnectWithoutPosterInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutPosterInput | DocumentUpsertWithWhereUniqueWithoutPosterInput[]
    createMany?: DocumentCreateManyPosterInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutPosterInput | DocumentUpdateWithWhereUniqueWithoutPosterInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutPosterInput | DocumentUpdateManyWithWhereWithoutPosterInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutClaimedByNestedInput = {
    create?: XOR<DocumentCreateWithoutClaimedByInput, DocumentUncheckedCreateWithoutClaimedByInput> | DocumentCreateWithoutClaimedByInput[] | DocumentUncheckedCreateWithoutClaimedByInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutClaimedByInput | DocumentCreateOrConnectWithoutClaimedByInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutClaimedByInput | DocumentUpsertWithWhereUniqueWithoutClaimedByInput[]
    createMany?: DocumentCreateManyClaimedByInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutClaimedByInput | DocumentUpdateWithWhereUniqueWithoutClaimedByInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutClaimedByInput | DocumentUpdateManyWithWhereWithoutClaimedByInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type DisputeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DisputeCreateWithoutUserInput, DisputeUncheckedCreateWithoutUserInput> | DisputeCreateWithoutUserInput[] | DisputeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutUserInput | DisputeCreateOrConnectWithoutUserInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutUserInput | DisputeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DisputeCreateManyUserInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutUserInput | DisputeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutUserInput | DisputeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type KioskUncheckedUpdateManyWithoutManagersNestedInput = {
    create?: XOR<KioskCreateWithoutManagersInput, KioskUncheckedCreateWithoutManagersInput> | KioskCreateWithoutManagersInput[] | KioskUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: KioskCreateOrConnectWithoutManagersInput | KioskCreateOrConnectWithoutManagersInput[]
    upsert?: KioskUpsertWithWhereUniqueWithoutManagersInput | KioskUpsertWithWhereUniqueWithoutManagersInput[]
    set?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    disconnect?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    delete?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    connect?: KioskWhereUniqueInput | KioskWhereUniqueInput[]
    update?: KioskUpdateWithWhereUniqueWithoutManagersInput | KioskUpdateWithWhereUniqueWithoutManagersInput[]
    updateMany?: KioskUpdateManyWithWhereWithoutManagersInput | KioskUpdateManyWithWhereWithoutManagersInput[]
    deleteMany?: KioskScalarWhereInput | KioskScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutChangedByInput, DocumentStatusHistoryUncheckedCreateWithoutChangedByInput> | DocumentStatusHistoryCreateWithoutChangedByInput[] | DocumentStatusHistoryUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutChangedByInput | DocumentStatusHistoryCreateOrConnectWithoutChangedByInput[]
    upsert?: DocumentStatusHistoryUpsertWithWhereUniqueWithoutChangedByInput | DocumentStatusHistoryUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: DocumentStatusHistoryCreateManyChangedByInputEnvelope
    set?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    disconnect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    delete?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    update?: DocumentStatusHistoryUpdateWithWhereUniqueWithoutChangedByInput | DocumentStatusHistoryUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: DocumentStatusHistoryUpdateManyWithWhereWithoutChangedByInput | DocumentStatusHistoryUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: DocumentStatusHistoryScalarWhereInput | DocumentStatusHistoryScalarWhereInput[]
  }

  export type KioskCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<KioskCreateWithoutDocumentsInput, KioskUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: KioskCreateOrConnectWithoutDocumentsInput
    connect?: KioskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClaimsInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentStatusHistoryCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutDocumentInput, DocumentStatusHistoryUncheckedCreateWithoutDocumentInput> | DocumentStatusHistoryCreateWithoutDocumentInput[] | DocumentStatusHistoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutDocumentInput | DocumentStatusHistoryCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentStatusHistoryCreateManyDocumentInputEnvelope
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutDocumentInput = {
    create?: XOR<NotificationCreateWithoutDocumentInput, NotificationUncheckedCreateWithoutDocumentInput> | NotificationCreateWithoutDocumentInput[] | NotificationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutDocumentInput | NotificationCreateOrConnectWithoutDocumentInput[]
    createMany?: NotificationCreateManyDocumentInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type DisputeCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DisputeCreateWithoutDocumentInput, DisputeUncheckedCreateWithoutDocumentInput> | DisputeCreateWithoutDocumentInput[] | DisputeUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutDocumentInput | DisputeCreateOrConnectWithoutDocumentInput[]
    createMany?: DisputeCreateManyDocumentInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type DocumentStatusHistoryUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutDocumentInput, DocumentStatusHistoryUncheckedCreateWithoutDocumentInput> | DocumentStatusHistoryCreateWithoutDocumentInput[] | DocumentStatusHistoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutDocumentInput | DocumentStatusHistoryCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentStatusHistoryCreateManyDocumentInputEnvelope
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<NotificationCreateWithoutDocumentInput, NotificationUncheckedCreateWithoutDocumentInput> | NotificationCreateWithoutDocumentInput[] | NotificationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutDocumentInput | NotificationCreateOrConnectWithoutDocumentInput[]
    createMany?: NotificationCreateManyDocumentInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type DisputeUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DisputeCreateWithoutDocumentInput, DisputeUncheckedCreateWithoutDocumentInput> | DisputeCreateWithoutDocumentInput[] | DisputeUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutDocumentInput | DisputeCreateOrConnectWithoutDocumentInput[]
    createMany?: DisputeCreateManyDocumentInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type EnumConditionFieldUpdateOperationsInput = {
    set?: $Enums.Condition
  }

  export type EnumDocumentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocumentStatus
  }

  export type KioskUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<KioskCreateWithoutDocumentsInput, KioskUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: KioskCreateOrConnectWithoutDocumentsInput
    upsert?: KioskUpsertWithoutDocumentsInput
    connect?: KioskWhereUniqueInput
    update?: XOR<XOR<KioskUpdateToOneWithWhereWithoutDocumentsInput, KioskUpdateWithoutDocumentsInput>, KioskUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsInput, UserUpdateWithoutDocumentsInput>, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateOneWithoutClaimsNestedInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    upsert?: UserUpsertWithoutClaimsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClaimsInput, UserUpdateWithoutClaimsInput>, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type DocumentStatusHistoryUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutDocumentInput, DocumentStatusHistoryUncheckedCreateWithoutDocumentInput> | DocumentStatusHistoryCreateWithoutDocumentInput[] | DocumentStatusHistoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutDocumentInput | DocumentStatusHistoryCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentStatusHistoryUpsertWithWhereUniqueWithoutDocumentInput | DocumentStatusHistoryUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentStatusHistoryCreateManyDocumentInputEnvelope
    set?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    disconnect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    delete?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    update?: DocumentStatusHistoryUpdateWithWhereUniqueWithoutDocumentInput | DocumentStatusHistoryUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentStatusHistoryUpdateManyWithWhereWithoutDocumentInput | DocumentStatusHistoryUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentStatusHistoryScalarWhereInput | DocumentStatusHistoryScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<NotificationCreateWithoutDocumentInput, NotificationUncheckedCreateWithoutDocumentInput> | NotificationCreateWithoutDocumentInput[] | NotificationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutDocumentInput | NotificationCreateOrConnectWithoutDocumentInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutDocumentInput | NotificationUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: NotificationCreateManyDocumentInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutDocumentInput | NotificationUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutDocumentInput | NotificationUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type DisputeUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DisputeCreateWithoutDocumentInput, DisputeUncheckedCreateWithoutDocumentInput> | DisputeCreateWithoutDocumentInput[] | DisputeUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutDocumentInput | DisputeCreateOrConnectWithoutDocumentInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutDocumentInput | DisputeUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DisputeCreateManyDocumentInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutDocumentInput | DisputeUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutDocumentInput | DisputeUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentStatusHistoryCreateWithoutDocumentInput, DocumentStatusHistoryUncheckedCreateWithoutDocumentInput> | DocumentStatusHistoryCreateWithoutDocumentInput[] | DocumentStatusHistoryUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentStatusHistoryCreateOrConnectWithoutDocumentInput | DocumentStatusHistoryCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentStatusHistoryUpsertWithWhereUniqueWithoutDocumentInput | DocumentStatusHistoryUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentStatusHistoryCreateManyDocumentInputEnvelope
    set?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    disconnect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    delete?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    connect?: DocumentStatusHistoryWhereUniqueInput | DocumentStatusHistoryWhereUniqueInput[]
    update?: DocumentStatusHistoryUpdateWithWhereUniqueWithoutDocumentInput | DocumentStatusHistoryUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentStatusHistoryUpdateManyWithWhereWithoutDocumentInput | DocumentStatusHistoryUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentStatusHistoryScalarWhereInput | DocumentStatusHistoryScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<NotificationCreateWithoutDocumentInput, NotificationUncheckedCreateWithoutDocumentInput> | NotificationCreateWithoutDocumentInput[] | NotificationUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutDocumentInput | NotificationCreateOrConnectWithoutDocumentInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutDocumentInput | NotificationUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: NotificationCreateManyDocumentInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutDocumentInput | NotificationUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutDocumentInput | NotificationUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type DisputeUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DisputeCreateWithoutDocumentInput, DisputeUncheckedCreateWithoutDocumentInput> | DisputeCreateWithoutDocumentInput[] | DisputeUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutDocumentInput | DisputeCreateOrConnectWithoutDocumentInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutDocumentInput | DisputeUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DisputeCreateManyDocumentInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutDocumentInput | DisputeUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutDocumentInput | DisputeUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type DocumentCreateNestedManyWithoutKioskInput = {
    create?: XOR<DocumentCreateWithoutKioskInput, DocumentUncheckedCreateWithoutKioskInput> | DocumentCreateWithoutKioskInput[] | DocumentUncheckedCreateWithoutKioskInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutKioskInput | DocumentCreateOrConnectWithoutKioskInput[]
    createMany?: DocumentCreateManyKioskInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutManagedKiosksInput = {
    create?: XOR<UserCreateWithoutManagedKiosksInput, UserUncheckedCreateWithoutManagedKiosksInput> | UserCreateWithoutManagedKiosksInput[] | UserUncheckedCreateWithoutManagedKiosksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagedKiosksInput | UserCreateOrConnectWithoutManagedKiosksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutKioskInput = {
    create?: XOR<DocumentCreateWithoutKioskInput, DocumentUncheckedCreateWithoutKioskInput> | DocumentCreateWithoutKioskInput[] | DocumentUncheckedCreateWithoutKioskInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutKioskInput | DocumentCreateOrConnectWithoutKioskInput[]
    createMany?: DocumentCreateManyKioskInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutManagedKiosksInput = {
    create?: XOR<UserCreateWithoutManagedKiosksInput, UserUncheckedCreateWithoutManagedKiosksInput> | UserCreateWithoutManagedKiosksInput[] | UserUncheckedCreateWithoutManagedKiosksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagedKiosksInput | UserCreateOrConnectWithoutManagedKiosksInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DocumentUpdateManyWithoutKioskNestedInput = {
    create?: XOR<DocumentCreateWithoutKioskInput, DocumentUncheckedCreateWithoutKioskInput> | DocumentCreateWithoutKioskInput[] | DocumentUncheckedCreateWithoutKioskInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutKioskInput | DocumentCreateOrConnectWithoutKioskInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutKioskInput | DocumentUpsertWithWhereUniqueWithoutKioskInput[]
    createMany?: DocumentCreateManyKioskInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutKioskInput | DocumentUpdateWithWhereUniqueWithoutKioskInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutKioskInput | DocumentUpdateManyWithWhereWithoutKioskInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type UserUpdateManyWithoutManagedKiosksNestedInput = {
    create?: XOR<UserCreateWithoutManagedKiosksInput, UserUncheckedCreateWithoutManagedKiosksInput> | UserCreateWithoutManagedKiosksInput[] | UserUncheckedCreateWithoutManagedKiosksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagedKiosksInput | UserCreateOrConnectWithoutManagedKiosksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutManagedKiosksInput | UserUpsertWithWhereUniqueWithoutManagedKiosksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutManagedKiosksInput | UserUpdateWithWhereUniqueWithoutManagedKiosksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutManagedKiosksInput | UserUpdateManyWithWhereWithoutManagedKiosksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutKioskNestedInput = {
    create?: XOR<DocumentCreateWithoutKioskInput, DocumentUncheckedCreateWithoutKioskInput> | DocumentCreateWithoutKioskInput[] | DocumentUncheckedCreateWithoutKioskInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutKioskInput | DocumentCreateOrConnectWithoutKioskInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutKioskInput | DocumentUpsertWithWhereUniqueWithoutKioskInput[]
    createMany?: DocumentCreateManyKioskInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutKioskInput | DocumentUpdateWithWhereUniqueWithoutKioskInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutKioskInput | DocumentUpdateManyWithWhereWithoutKioskInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutManagedKiosksNestedInput = {
    create?: XOR<UserCreateWithoutManagedKiosksInput, UserUncheckedCreateWithoutManagedKiosksInput> | UserCreateWithoutManagedKiosksInput[] | UserUncheckedCreateWithoutManagedKiosksInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagedKiosksInput | UserCreateOrConnectWithoutManagedKiosksInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutManagedKiosksInput | UserUpsertWithWhereUniqueWithoutManagedKiosksInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutManagedKiosksInput | UserUpdateWithWhereUniqueWithoutManagedKiosksInput[]
    updateMany?: UserUpdateManyWithWhereWithoutManagedKiosksInput | UserUpdateManyWithWhereWithoutManagedKiosksInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<DocumentCreateWithoutNotificationsInput, DocumentUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutNotificationsInput
    connect?: DocumentWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type EnumNotificationChannelFieldUpdateOperationsInput = {
    set?: $Enums.NotificationChannel
  }

  export type UserUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type DocumentUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<DocumentCreateWithoutNotificationsInput, DocumentUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutNotificationsInput
    upsert?: DocumentUpsertWithoutNotificationsInput
    disconnect?: DocumentWhereInput | boolean
    delete?: DocumentWhereInput | boolean
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutNotificationsInput, DocumentUpdateWithoutNotificationsInput>, DocumentUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutDisputesInput = {
    create?: XOR<UserCreateWithoutDisputesInput, UserUncheckedCreateWithoutDisputesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisputesInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentCreateNestedOneWithoutDisputesInput = {
    create?: XOR<DocumentCreateWithoutDisputesInput, DocumentUncheckedCreateWithoutDisputesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutDisputesInput
    connect?: DocumentWhereUniqueInput
  }

  export type EnumDisputeCategoryFieldUpdateOperationsInput = {
    set?: $Enums.DisputeCategory
  }

  export type EnumDisputeStatusFieldUpdateOperationsInput = {
    set?: $Enums.DisputeStatus
  }

  export type UserUpdateOneRequiredWithoutDisputesNestedInput = {
    create?: XOR<UserCreateWithoutDisputesInput, UserUncheckedCreateWithoutDisputesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisputesInput
    upsert?: UserUpsertWithoutDisputesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDisputesInput, UserUpdateWithoutDisputesInput>, UserUncheckedUpdateWithoutDisputesInput>
  }

  export type DocumentUpdateOneRequiredWithoutDisputesNestedInput = {
    create?: XOR<DocumentCreateWithoutDisputesInput, DocumentUncheckedCreateWithoutDisputesInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutDisputesInput
    upsert?: DocumentUpsertWithoutDisputesInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutDisputesInput, DocumentUpdateWithoutDisputesInput>, DocumentUncheckedUpdateWithoutDisputesInput>
  }

  export type DocumentCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<DocumentCreateWithoutStatusHistoryInput, DocumentUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutStatusHistoryInput
    connect?: DocumentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStatusChangesInput = {
    create?: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusChangesInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<DocumentCreateWithoutStatusHistoryInput, DocumentUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutStatusHistoryInput
    upsert?: DocumentUpsertWithoutStatusHistoryInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutStatusHistoryInput, DocumentUpdateWithoutStatusHistoryInput>, DocumentUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type UserUpdateOneWithoutStatusChangesNestedInput = {
    create?: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatusChangesInput
    upsert?: UserUpsertWithoutStatusChangesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatusChangesInput, UserUpdateWithoutStatusChangesInput>, UserUncheckedUpdateWithoutStatusChangesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumConditionFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionFilter<$PrismaModel> | $Enums.Condition
  }

  export type NestedEnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type NestedEnumConditionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>
    in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>
    not?: NestedEnumConditionWithAggregatesFilter<$PrismaModel> | $Enums.Condition
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConditionFilter<$PrismaModel>
    _max?: NestedEnumConditionFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | EnumNotificationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationChannel[] | ListEnumNotificationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationChannelFilter<$PrismaModel>
    _max?: NestedEnumNotificationChannelFilter<$PrismaModel>
  }

  export type NestedEnumDisputeCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeCategory | EnumDisputeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeCategoryFilter<$PrismaModel> | $Enums.DisputeCategory
  }

  export type NestedEnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus
  }

  export type NestedEnumDisputeCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeCategory | EnumDisputeCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeCategory[] | ListEnumDisputeCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeCategoryWithAggregatesFilter<$PrismaModel> | $Enums.DisputeCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisputeCategoryFilter<$PrismaModel>
    _max?: NestedEnumDisputeCategoryFilter<$PrismaModel>
  }

  export type NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisputeStatusFilter<$PrismaModel>
    _max?: NestedEnumDisputeStatusFilter<$PrismaModel>
  }

  export type DocumentCreateWithoutPosterInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    kiosk: KioskCreateNestedOneWithoutDocumentsInput
    claimedBy?: UserCreateNestedOneWithoutClaimsInput
    statusHistory?: DocumentStatusHistoryCreateNestedManyWithoutDocumentInput
    notifications?: NotificationCreateNestedManyWithoutDocumentInput
    disputes?: DisputeCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutPosterInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutDocumentInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutDocumentInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutPosterInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutPosterInput, DocumentUncheckedCreateWithoutPosterInput>
  }

  export type DocumentCreateManyPosterInputEnvelope = {
    data: DocumentCreateManyPosterInput | DocumentCreateManyPosterInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutClaimedByInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    kiosk: KioskCreateNestedOneWithoutDocumentsInput
    poster: UserCreateNestedOneWithoutDocumentsInput
    statusHistory?: DocumentStatusHistoryCreateNestedManyWithoutDocumentInput
    notifications?: NotificationCreateNestedManyWithoutDocumentInput
    disputes?: DisputeCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutClaimedByInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutDocumentInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutDocumentInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutClaimedByInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutClaimedByInput, DocumentUncheckedCreateWithoutClaimedByInput>
  }

  export type DocumentCreateManyClaimedByInputEnvelope = {
    data: DocumentCreateManyClaimedByInput | DocumentCreateManyClaimedByInput[]
    skipDuplicates?: boolean
  }

  export type DisputeCreateWithoutUserInput = {
    id?: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutDisputesInput
  }

  export type DisputeUncheckedCreateWithoutUserInput = {
    id?: string
    documentId: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeCreateOrConnectWithoutUserInput = {
    where: DisputeWhereUniqueInput
    create: XOR<DisputeCreateWithoutUserInput, DisputeUncheckedCreateWithoutUserInput>
  }

  export type DisputeCreateManyUserInputEnvelope = {
    data: DisputeCreateManyUserInput | DisputeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type KioskCreateWithoutManagersInput = {
    id?: string
    name: string
    location: string
    phone: string
    hours?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutKioskInput
  }

  export type KioskUncheckedCreateWithoutManagersInput = {
    id?: string
    name: string
    location: string
    phone: string
    hours?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutKioskInput
  }

  export type KioskCreateOrConnectWithoutManagersInput = {
    where: KioskWhereUniqueInput
    create: XOR<KioskCreateWithoutManagersInput, KioskUncheckedCreateWithoutManagersInput>
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
    document?: DocumentCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    documentId?: string | null
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DocumentStatusHistoryCreateWithoutChangedByInput = {
    id?: string
    status: $Enums.DocumentStatus
    createdAt?: Date | string
    document: DocumentCreateNestedOneWithoutStatusHistoryInput
  }

  export type DocumentStatusHistoryUncheckedCreateWithoutChangedByInput = {
    id?: string
    documentId: string
    status: $Enums.DocumentStatus
    createdAt?: Date | string
  }

  export type DocumentStatusHistoryCreateOrConnectWithoutChangedByInput = {
    where: DocumentStatusHistoryWhereUniqueInput
    create: XOR<DocumentStatusHistoryCreateWithoutChangedByInput, DocumentStatusHistoryUncheckedCreateWithoutChangedByInput>
  }

  export type DocumentStatusHistoryCreateManyChangedByInputEnvelope = {
    data: DocumentStatusHistoryCreateManyChangedByInput | DocumentStatusHistoryCreateManyChangedByInput[]
    skipDuplicates?: boolean
  }

  export type DocumentUpsertWithWhereUniqueWithoutPosterInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutPosterInput, DocumentUncheckedUpdateWithoutPosterInput>
    create: XOR<DocumentCreateWithoutPosterInput, DocumentUncheckedCreateWithoutPosterInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutPosterInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutPosterInput, DocumentUncheckedUpdateWithoutPosterInput>
  }

  export type DocumentUpdateManyWithWhereWithoutPosterInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutPosterInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    firstName?: StringFilter<"Document"> | string
    middleName?: StringNullableFilter<"Document"> | string | null
    lastName?: StringFilter<"Document"> | string
    dateOfBirth?: DateTimeFilter<"Document"> | Date | string
    documentNumber?: StringFilter<"Document"> | string
    foundLocation?: StringFilter<"Document"> | string
    foundDistrict?: StringFilter<"Document"> | string
    foundDivision?: StringFilter<"Document"> | string
    foundSubLocation?: StringFilter<"Document"> | string
    dateFound?: DateTimeFilter<"Document"> | Date | string
    condition?: EnumConditionFilter<"Document"> | $Enums.Condition
    kioskId?: StringFilter<"Document"> | string
    posterId?: StringFilter<"Document"> | string
    claimedById?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    expiredAt?: DateTimeNullableFilter<"Document"> | Date | string | null
  }

  export type DocumentUpsertWithWhereUniqueWithoutClaimedByInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutClaimedByInput, DocumentUncheckedUpdateWithoutClaimedByInput>
    create: XOR<DocumentCreateWithoutClaimedByInput, DocumentUncheckedCreateWithoutClaimedByInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutClaimedByInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutClaimedByInput, DocumentUncheckedUpdateWithoutClaimedByInput>
  }

  export type DocumentUpdateManyWithWhereWithoutClaimedByInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutClaimedByInput>
  }

  export type DisputeUpsertWithWhereUniqueWithoutUserInput = {
    where: DisputeWhereUniqueInput
    update: XOR<DisputeUpdateWithoutUserInput, DisputeUncheckedUpdateWithoutUserInput>
    create: XOR<DisputeCreateWithoutUserInput, DisputeUncheckedCreateWithoutUserInput>
  }

  export type DisputeUpdateWithWhereUniqueWithoutUserInput = {
    where: DisputeWhereUniqueInput
    data: XOR<DisputeUpdateWithoutUserInput, DisputeUncheckedUpdateWithoutUserInput>
  }

  export type DisputeUpdateManyWithWhereWithoutUserInput = {
    where: DisputeScalarWhereInput
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyWithoutUserInput>
  }

  export type DisputeScalarWhereInput = {
    AND?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
    OR?: DisputeScalarWhereInput[]
    NOT?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
    id?: StringFilter<"Dispute"> | string
    userId?: StringFilter<"Dispute"> | string
    documentId?: StringFilter<"Dispute"> | string
    category?: EnumDisputeCategoryFilter<"Dispute"> | $Enums.DisputeCategory
    explanation?: StringNullableFilter<"Dispute"> | string | null
    status?: EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
  }

  export type KioskUpsertWithWhereUniqueWithoutManagersInput = {
    where: KioskWhereUniqueInput
    update: XOR<KioskUpdateWithoutManagersInput, KioskUncheckedUpdateWithoutManagersInput>
    create: XOR<KioskCreateWithoutManagersInput, KioskUncheckedCreateWithoutManagersInput>
  }

  export type KioskUpdateWithWhereUniqueWithoutManagersInput = {
    where: KioskWhereUniqueInput
    data: XOR<KioskUpdateWithoutManagersInput, KioskUncheckedUpdateWithoutManagersInput>
  }

  export type KioskUpdateManyWithWhereWithoutManagersInput = {
    where: KioskScalarWhereInput
    data: XOR<KioskUpdateManyMutationInput, KioskUncheckedUpdateManyWithoutManagersInput>
  }

  export type KioskScalarWhereInput = {
    AND?: KioskScalarWhereInput | KioskScalarWhereInput[]
    OR?: KioskScalarWhereInput[]
    NOT?: KioskScalarWhereInput | KioskScalarWhereInput[]
    id?: StringFilter<"Kiosk"> | string
    name?: StringFilter<"Kiosk"> | string
    location?: StringFilter<"Kiosk"> | string
    phone?: StringFilter<"Kiosk"> | string
    hours?: StringNullableFilter<"Kiosk"> | string | null
    isActive?: BoolFilter<"Kiosk"> | boolean
    createdAt?: DateTimeFilter<"Kiosk"> | Date | string
    updatedAt?: DateTimeFilter<"Kiosk"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringNullableFilter<"Notification"> | string | null
    documentId?: StringNullableFilter<"Notification"> | string | null
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    channel?: EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel
    message?: StringFilter<"Notification"> | string
    sent?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type DocumentStatusHistoryUpsertWithWhereUniqueWithoutChangedByInput = {
    where: DocumentStatusHistoryWhereUniqueInput
    update: XOR<DocumentStatusHistoryUpdateWithoutChangedByInput, DocumentStatusHistoryUncheckedUpdateWithoutChangedByInput>
    create: XOR<DocumentStatusHistoryCreateWithoutChangedByInput, DocumentStatusHistoryUncheckedCreateWithoutChangedByInput>
  }

  export type DocumentStatusHistoryUpdateWithWhereUniqueWithoutChangedByInput = {
    where: DocumentStatusHistoryWhereUniqueInput
    data: XOR<DocumentStatusHistoryUpdateWithoutChangedByInput, DocumentStatusHistoryUncheckedUpdateWithoutChangedByInput>
  }

  export type DocumentStatusHistoryUpdateManyWithWhereWithoutChangedByInput = {
    where: DocumentStatusHistoryScalarWhereInput
    data: XOR<DocumentStatusHistoryUpdateManyMutationInput, DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByInput>
  }

  export type DocumentStatusHistoryScalarWhereInput = {
    AND?: DocumentStatusHistoryScalarWhereInput | DocumentStatusHistoryScalarWhereInput[]
    OR?: DocumentStatusHistoryScalarWhereInput[]
    NOT?: DocumentStatusHistoryScalarWhereInput | DocumentStatusHistoryScalarWhereInput[]
    id?: StringFilter<"DocumentStatusHistory"> | string
    documentId?: StringFilter<"DocumentStatusHistory"> | string
    status?: EnumDocumentStatusFilter<"DocumentStatusHistory"> | $Enums.DocumentStatus
    changedById?: StringNullableFilter<"DocumentStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"DocumentStatusHistory"> | Date | string
  }

  export type KioskCreateWithoutDocumentsInput = {
    id?: string
    name: string
    location: string
    phone: string
    hours?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    managers?: UserCreateNestedManyWithoutManagedKiosksInput
  }

  export type KioskUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    location: string
    phone: string
    hours?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    managers?: UserUncheckedCreateNestedManyWithoutManagedKiosksInput
  }

  export type KioskCreateOrConnectWithoutDocumentsInput = {
    where: KioskWhereUniqueInput
    create: XOR<KioskCreateWithoutDocumentsInput, KioskUncheckedCreateWithoutDocumentsInput>
  }

  export type UserCreateWithoutDocumentsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: DocumentCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeCreateNestedManyWithoutUserInput
    managedKiosks?: KioskCreateNestedManyWithoutManagersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    claims?: DocumentUncheckedCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutUserInput
    managedKiosks?: KioskUncheckedCreateNestedManyWithoutManagersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type UserCreateWithoutClaimsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutPosterInput
    disputes?: DisputeCreateNestedManyWithoutUserInput
    managedKiosks?: KioskCreateNestedManyWithoutManagersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutClaimsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutPosterInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutUserInput
    managedKiosks?: KioskUncheckedCreateNestedManyWithoutManagersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutClaimsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
  }

  export type DocumentStatusHistoryCreateWithoutDocumentInput = {
    id?: string
    status: $Enums.DocumentStatus
    createdAt?: Date | string
    changedBy?: UserCreateNestedOneWithoutStatusChangesInput
  }

  export type DocumentStatusHistoryUncheckedCreateWithoutDocumentInput = {
    id?: string
    status: $Enums.DocumentStatus
    changedById?: string | null
    createdAt?: Date | string
  }

  export type DocumentStatusHistoryCreateOrConnectWithoutDocumentInput = {
    where: DocumentStatusHistoryWhereUniqueInput
    create: XOR<DocumentStatusHistoryCreateWithoutDocumentInput, DocumentStatusHistoryUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentStatusHistoryCreateManyDocumentInputEnvelope = {
    data: DocumentStatusHistoryCreateManyDocumentInput | DocumentStatusHistoryCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutDocumentInput = {
    id?: string
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutDocumentInput = {
    id?: string
    userId?: string | null
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutDocumentInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutDocumentInput, NotificationUncheckedCreateWithoutDocumentInput>
  }

  export type NotificationCreateManyDocumentInputEnvelope = {
    data: NotificationCreateManyDocumentInput | NotificationCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type DisputeCreateWithoutDocumentInput = {
    id?: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDisputesInput
  }

  export type DisputeUncheckedCreateWithoutDocumentInput = {
    id?: string
    userId: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DisputeCreateOrConnectWithoutDocumentInput = {
    where: DisputeWhereUniqueInput
    create: XOR<DisputeCreateWithoutDocumentInput, DisputeUncheckedCreateWithoutDocumentInput>
  }

  export type DisputeCreateManyDocumentInputEnvelope = {
    data: DisputeCreateManyDocumentInput | DisputeCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type KioskUpsertWithoutDocumentsInput = {
    update: XOR<KioskUpdateWithoutDocumentsInput, KioskUncheckedUpdateWithoutDocumentsInput>
    create: XOR<KioskCreateWithoutDocumentsInput, KioskUncheckedCreateWithoutDocumentsInput>
    where?: KioskWhereInput
  }

  export type KioskUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: KioskWhereInput
    data: XOR<KioskUpdateWithoutDocumentsInput, KioskUncheckedUpdateWithoutDocumentsInput>
  }

  export type KioskUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: UserUpdateManyWithoutManagedKiosksNestedInput
  }

  export type KioskUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: UserUncheckedUpdateManyWithoutManagedKiosksNestedInput
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: DocumentUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: DocumentUncheckedUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUncheckedUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserUpsertWithoutClaimsInput = {
    update: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClaimsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutPosterNestedInput
    disputes?: DisputeUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutPosterNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUncheckedUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type DocumentStatusHistoryUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentStatusHistoryWhereUniqueInput
    update: XOR<DocumentStatusHistoryUpdateWithoutDocumentInput, DocumentStatusHistoryUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentStatusHistoryCreateWithoutDocumentInput, DocumentStatusHistoryUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentStatusHistoryUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentStatusHistoryWhereUniqueInput
    data: XOR<DocumentStatusHistoryUpdateWithoutDocumentInput, DocumentStatusHistoryUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentStatusHistoryUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentStatusHistoryScalarWhereInput
    data: XOR<DocumentStatusHistoryUpdateManyMutationInput, DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutDocumentInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutDocumentInput, NotificationUncheckedUpdateWithoutDocumentInput>
    create: XOR<NotificationCreateWithoutDocumentInput, NotificationUncheckedCreateWithoutDocumentInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutDocumentInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutDocumentInput, NotificationUncheckedUpdateWithoutDocumentInput>
  }

  export type NotificationUpdateManyWithWhereWithoutDocumentInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DisputeUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DisputeWhereUniqueInput
    update: XOR<DisputeUpdateWithoutDocumentInput, DisputeUncheckedUpdateWithoutDocumentInput>
    create: XOR<DisputeCreateWithoutDocumentInput, DisputeUncheckedCreateWithoutDocumentInput>
  }

  export type DisputeUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DisputeWhereUniqueInput
    data: XOR<DisputeUpdateWithoutDocumentInput, DisputeUncheckedUpdateWithoutDocumentInput>
  }

  export type DisputeUpdateManyWithWhereWithoutDocumentInput = {
    where: DisputeScalarWhereInput
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentCreateWithoutKioskInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    poster: UserCreateNestedOneWithoutDocumentsInput
    claimedBy?: UserCreateNestedOneWithoutClaimsInput
    statusHistory?: DocumentStatusHistoryCreateNestedManyWithoutDocumentInput
    notifications?: NotificationCreateNestedManyWithoutDocumentInput
    disputes?: DisputeCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutKioskInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    posterId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutDocumentInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutDocumentInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutKioskInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutKioskInput, DocumentUncheckedCreateWithoutKioskInput>
  }

  export type DocumentCreateManyKioskInputEnvelope = {
    data: DocumentCreateManyKioskInput | DocumentCreateManyKioskInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutManagedKiosksInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutPosterInput
    claims?: DocumentCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutManagedKiosksInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutPosterInput
    claims?: DocumentUncheckedCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutManagedKiosksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutManagedKiosksInput, UserUncheckedCreateWithoutManagedKiosksInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutKioskInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutKioskInput, DocumentUncheckedUpdateWithoutKioskInput>
    create: XOR<DocumentCreateWithoutKioskInput, DocumentUncheckedCreateWithoutKioskInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutKioskInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutKioskInput, DocumentUncheckedUpdateWithoutKioskInput>
  }

  export type DocumentUpdateManyWithWhereWithoutKioskInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutKioskInput>
  }

  export type UserUpsertWithWhereUniqueWithoutManagedKiosksInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutManagedKiosksInput, UserUncheckedUpdateWithoutManagedKiosksInput>
    create: XOR<UserCreateWithoutManagedKiosksInput, UserUncheckedCreateWithoutManagedKiosksInput>
  }

  export type UserUpdateWithWhereUniqueWithoutManagedKiosksInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutManagedKiosksInput, UserUncheckedUpdateWithoutManagedKiosksInput>
  }

  export type UserUpdateManyWithWhereWithoutManagedKiosksInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutManagedKiosksInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutPosterInput
    claims?: DocumentCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeCreateNestedManyWithoutUserInput
    managedKiosks?: KioskCreateNestedManyWithoutManagersInput
    statusChanges?: DocumentStatusHistoryCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutPosterInput
    claims?: DocumentUncheckedCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutUserInput
    managedKiosks?: KioskUncheckedCreateNestedManyWithoutManagersInput
    statusChanges?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type DocumentCreateWithoutNotificationsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    kiosk: KioskCreateNestedOneWithoutDocumentsInput
    poster: UserCreateNestedOneWithoutDocumentsInput
    claimedBy?: UserCreateNestedOneWithoutClaimsInput
    statusHistory?: DocumentStatusHistoryCreateNestedManyWithoutDocumentInput
    disputes?: DisputeCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutNotificationsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutDocumentInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutNotificationsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutNotificationsInput, DocumentUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutPosterNestedInput
    claims?: DocumentUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUpdateManyWithoutManagersNestedInput
    statusChanges?: DocumentStatusHistoryUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutPosterNestedInput
    claims?: DocumentUncheckedUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUncheckedUpdateManyWithoutManagersNestedInput
    statusChanges?: DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type DocumentUpsertWithoutNotificationsInput = {
    update: XOR<DocumentUpdateWithoutNotificationsInput, DocumentUncheckedUpdateWithoutNotificationsInput>
    create: XOR<DocumentCreateWithoutNotificationsInput, DocumentUncheckedCreateWithoutNotificationsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutNotificationsInput, DocumentUncheckedUpdateWithoutNotificationsInput>
  }

  export type DocumentUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kiosk?: KioskUpdateOneRequiredWithoutDocumentsNestedInput
    poster?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    claimedBy?: UserUpdateOneWithoutClaimsNestedInput
    statusHistory?: DocumentStatusHistoryUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type UserCreateWithoutDisputesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutPosterInput
    claims?: DocumentCreateNestedManyWithoutClaimedByInput
    managedKiosks?: KioskCreateNestedManyWithoutManagersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryCreateNestedManyWithoutChangedByInput
  }

  export type UserUncheckedCreateWithoutDisputesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutPosterInput
    claims?: DocumentUncheckedCreateNestedManyWithoutClaimedByInput
    managedKiosks?: KioskUncheckedCreateNestedManyWithoutManagersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    statusChanges?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type UserCreateOrConnectWithoutDisputesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDisputesInput, UserUncheckedCreateWithoutDisputesInput>
  }

  export type DocumentCreateWithoutDisputesInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    kiosk: KioskCreateNestedOneWithoutDocumentsInput
    poster: UserCreateNestedOneWithoutDocumentsInput
    claimedBy?: UserCreateNestedOneWithoutClaimsInput
    statusHistory?: DocumentStatusHistoryCreateNestedManyWithoutDocumentInput
    notifications?: NotificationCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutDisputesInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedCreateNestedManyWithoutDocumentInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutDisputesInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutDisputesInput, DocumentUncheckedCreateWithoutDisputesInput>
  }

  export type UserUpsertWithoutDisputesInput = {
    update: XOR<UserUpdateWithoutDisputesInput, UserUncheckedUpdateWithoutDisputesInput>
    create: XOR<UserCreateWithoutDisputesInput, UserUncheckedCreateWithoutDisputesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDisputesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDisputesInput, UserUncheckedUpdateWithoutDisputesInput>
  }

  export type UserUpdateWithoutDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutPosterNestedInput
    claims?: DocumentUpdateManyWithoutClaimedByNestedInput
    managedKiosks?: KioskUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutPosterNestedInput
    claims?: DocumentUncheckedUpdateManyWithoutClaimedByNestedInput
    managedKiosks?: KioskUncheckedUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type DocumentUpsertWithoutDisputesInput = {
    update: XOR<DocumentUpdateWithoutDisputesInput, DocumentUncheckedUpdateWithoutDisputesInput>
    create: XOR<DocumentCreateWithoutDisputesInput, DocumentUncheckedCreateWithoutDisputesInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutDisputesInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutDisputesInput, DocumentUncheckedUpdateWithoutDisputesInput>
  }

  export type DocumentUpdateWithoutDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kiosk?: KioskUpdateOneRequiredWithoutDocumentsNestedInput
    poster?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    claimedBy?: UserUpdateOneWithoutClaimsNestedInput
    statusHistory?: DocumentStatusHistoryUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutDisputesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateWithoutStatusHistoryInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    kiosk: KioskCreateNestedOneWithoutDocumentsInput
    poster: UserCreateNestedOneWithoutDocumentsInput
    claimedBy?: UserCreateNestedOneWithoutClaimsInput
    notifications?: NotificationCreateNestedManyWithoutDocumentInput
    disputes?: DisputeCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
    notifications?: NotificationUncheckedCreateNestedManyWithoutDocumentInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutStatusHistoryInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutStatusHistoryInput, DocumentUncheckedCreateWithoutStatusHistoryInput>
  }

  export type UserCreateWithoutStatusChangesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutPosterInput
    claims?: DocumentCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeCreateNestedManyWithoutUserInput
    managedKiosks?: KioskCreateNestedManyWithoutManagersInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStatusChangesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    phone?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutPosterInput
    claims?: DocumentUncheckedCreateNestedManyWithoutClaimedByInput
    disputes?: DisputeUncheckedCreateNestedManyWithoutUserInput
    managedKiosks?: KioskUncheckedCreateNestedManyWithoutManagersInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStatusChangesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
  }

  export type DocumentUpsertWithoutStatusHistoryInput = {
    update: XOR<DocumentUpdateWithoutStatusHistoryInput, DocumentUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<DocumentCreateWithoutStatusHistoryInput, DocumentUncheckedCreateWithoutStatusHistoryInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutStatusHistoryInput, DocumentUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type DocumentUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kiosk?: KioskUpdateOneRequiredWithoutDocumentsNestedInput
    poster?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    claimedBy?: UserUpdateOneWithoutClaimsNestedInput
    notifications?: NotificationUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notifications?: NotificationUncheckedUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type UserUpsertWithoutStatusChangesInput = {
    update: XOR<UserUpdateWithoutStatusChangesInput, UserUncheckedUpdateWithoutStatusChangesInput>
    create: XOR<UserCreateWithoutStatusChangesInput, UserUncheckedCreateWithoutStatusChangesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatusChangesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatusChangesInput, UserUncheckedUpdateWithoutStatusChangesInput>
  }

  export type UserUpdateWithoutStatusChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutPosterNestedInput
    claims?: DocumentUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStatusChangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutPosterNestedInput
    claims?: DocumentUncheckedUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutUserNestedInput
    managedKiosks?: KioskUncheckedUpdateManyWithoutManagersNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DocumentCreateManyPosterInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
  }

  export type DocumentCreateManyClaimedByInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    kioskId: string
    posterId: string
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
  }

  export type DisputeCreateManyUserInput = {
    id?: string
    documentId: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    documentId?: string | null
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
  }

  export type DocumentStatusHistoryCreateManyChangedByInput = {
    id?: string
    documentId: string
    status: $Enums.DocumentStatus
    createdAt?: Date | string
  }

  export type DocumentUpdateWithoutPosterInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kiosk?: KioskUpdateOneRequiredWithoutDocumentsNestedInput
    claimedBy?: UserUpdateOneWithoutClaimsNestedInput
    statusHistory?: DocumentStatusHistoryUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutPosterInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutPosterInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUpdateWithoutClaimedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kiosk?: KioskUpdateOneRequiredWithoutDocumentsNestedInput
    poster?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    statusHistory?: DocumentStatusHistoryUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutClaimedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutClaimedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    kioskId?: StringFieldUpdateOperationsInput | string
    posterId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DisputeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutDisputesNestedInput
  }

  export type DisputeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KioskUpdateWithoutManagersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutKioskNestedInput
  }

  export type KioskUncheckedUpdateWithoutManagersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutKioskNestedInput
  }

  export type KioskUncheckedUpdateManyWithoutManagersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    hours?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentStatusHistoryUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type DocumentStatusHistoryUncheckedUpdateWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentStatusHistoryCreateManyDocumentInput = {
    id?: string
    status: $Enums.DocumentStatus
    changedById?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateManyDocumentInput = {
    id?: string
    userId?: string | null
    type: $Enums.NotificationType
    channel: $Enums.NotificationChannel
    message: string
    sent?: boolean
    createdAt?: Date | string
  }

  export type DisputeCreateManyDocumentInput = {
    id?: string
    userId: string
    category: $Enums.DisputeCategory
    explanation?: string | null
    status?: $Enums.DisputeStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentStatusHistoryUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: UserUpdateOneWithoutStatusChangesNestedInput
  }

  export type DocumentStatusHistoryUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    changedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    changedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    channel?: EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
    message?: StringFieldUpdateOperationsInput | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDisputesNestedInput
  }

  export type DisputeUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumDisputeCategoryFieldUpdateOperationsInput | $Enums.DisputeCategory
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManyKioskInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    documentNumber: string
    foundLocation: string
    foundDistrict: string
    foundDivision: string
    foundSubLocation: string
    dateFound: Date | string
    condition: $Enums.Condition
    posterId: string
    claimedById?: string | null
    status?: $Enums.DocumentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiredAt?: Date | string | null
  }

  export type DocumentUpdateWithoutKioskInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    poster?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    claimedBy?: UserUpdateOneWithoutClaimsNestedInput
    statusHistory?: DocumentStatusHistoryUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutKioskInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    posterId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusHistory?: DocumentStatusHistoryUncheckedUpdateManyWithoutDocumentNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutDocumentNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutKioskInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    documentNumber?: StringFieldUpdateOperationsInput | string
    foundLocation?: StringFieldUpdateOperationsInput | string
    foundDistrict?: StringFieldUpdateOperationsInput | string
    foundDivision?: StringFieldUpdateOperationsInput | string
    foundSubLocation?: StringFieldUpdateOperationsInput | string
    dateFound?: DateTimeFieldUpdateOperationsInput | Date | string
    condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition
    posterId?: StringFieldUpdateOperationsInput | string
    claimedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpdateWithoutManagedKiosksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutPosterNestedInput
    claims?: DocumentUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateWithoutManagedKiosksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutPosterNestedInput
    claims?: DocumentUncheckedUpdateManyWithoutClaimedByNestedInput
    disputes?: DisputeUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    statusChanges?: DocumentStatusHistoryUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type UserUncheckedUpdateManyWithoutManagedKiosksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}