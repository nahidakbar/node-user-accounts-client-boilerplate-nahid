# Class

## `Client`

Authentication Client

### `constructor()`

### `prefix: *`

### `endpoint: *`

### `currentUser(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `updateCurrentUser(update: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| update | * | nullable: undefined |

### `isLoggedIn(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `loginMethods(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `login(method: *, parameters: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| method | * | nullable: undefined |
| parameters | * | nullable: undefined |

### `loginPasswordless(method: *, parameters: *, mode: string): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| method | * | nullable: undefined |
| parameters | * | nullable: undefined |
| mode | string | nullable: undefined, optional: true, default: passwordless |

### `logout(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `createUser(credentialType: *, credentialValue: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| credentialType | * | nullable: undefined |
| credentialValue | * | nullable: undefined |

### `searchUsers(options: {}): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | {} | nullable: undefined, optional: true, default: {} |

### `readUser(id: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| id | * | nullable: undefined |

### `updateUser(id: *, update: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| id | * | nullable: undefined |
| update | * | nullable: undefined |

### `deleteUser(id: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| id | * | nullable: undefined |

### `fields(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

# Function

## `showEditor(parent: *, editor: *, value: *, saveCallback: *, orderMatters: boolean)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| editor | * | nullable: undefined |
| value | * | nullable: undefined |
| saveCallback | * | nullable: undefined |
| orderMatters | boolean | nullable: undefined, optional: true, default: false |

## `defaultAdd(defaultValue: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| defaultValue | * | nullable: undefined |

## `showArrayEditor(container: *, editor: *, data: *, saveCallback: *, defaultValue: string)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| container | * | nullable: undefined |
| editor | * | nullable: undefined |
| data | * | nullable: undefined |
| saveCallback | * | nullable: undefined |
| defaultValue | string | nullable: undefined, optional: true |

## `section(parent: *, label: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| label | * | nullable: undefined |

## `keyValue(parent: *, label: *, class_: string): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| label | * | nullable: undefined |
| class_ | string | nullable: undefined, optional: true |

## `edit(parent: *, name: *, callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| name | * | nullable: undefined |
| callback | * | nullable: undefined |

## `view(parent: *, name: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| name | * | nullable: undefined |

## `edit(parent: *, value: *, callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| value | * | nullable: undefined |
| callback | * | nullable: undefined |

## `view(parent: *, value: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| value | * | nullable: undefined |

## `select(options: *): {"edit": *, "view": *}`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | * | nullable: undefined |

## `multiselect(options: *): {"edit": *, "view": *}`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | * | nullable: undefined |

## `edit(parent: *, value: *, callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| value | * | nullable: undefined |
| callback | * | nullable: undefined |

## `view(parent: *, value: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| parent | * | nullable: undefined |
| value | * | nullable: undefined |

## `endpoint(prefix: string, format: string): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| prefix | string | nullable: undefined, optional: true, default: / |
| format | string | nullable: undefined, optional: true, default: .json |

## `request(method: *, url: *, body: *, transform: *, headers: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| method | * | nullable: undefined |
| url | * | nullable: undefined |
| body | * | nullable: undefined, optional: true, default: undefined |
| transform | * | nullable: undefined, optional: true |
| headers | * | nullable: undefined, optional: true, default: defaultHeaders |

## `createRequest(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `readRequest(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `updateRequest(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `deleteRequest(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `searchRequest(): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `registerProgressCallback(callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| callback | * | nullable: undefined |

## `emailLogin(accounts: *, parent: *, method: *, callback: *, options: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| accounts | * | nullable: undefined |
| parent | * | nullable: undefined |
| method | * | nullable: undefined |
| callback | * | nullable: undefined |
| options | * | nullable: undefined |

## `oneClickLogin(accounts: *, parent: *, method: *, callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| accounts | * | nullable: undefined |
| parent | * | nullable: undefined |
| method | * | nullable: undefined |
| callback | * | nullable: undefined |

## `showLoginView(accounts: *, parent: *, options: {}): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| accounts | * | nullable: undefined |
| parent | * | nullable: undefined |
| options | {} | nullable: undefined, optional: true, default: {} |

## `makeDefaultFields(options: *): *`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | * | nullable: undefined |

## `showProfileView(accounts: *, parent: *, options: {})`

xxx

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| accounts | * | nullable: undefined |
| parent | * | nullable: undefined |
| options | {} | nullable: undefined, optional: true, default: {} |

## `showManageView(accounts: *, parent: *, options: {})`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| accounts | * | nullable: undefined |
| parent | * | nullable: undefined |
| options | {} | nullable: undefined, optional: true, default: {} |