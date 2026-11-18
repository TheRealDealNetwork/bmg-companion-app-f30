//#region node_modules/.nitro/vite/services/ssr/assets/db-DHZvd9Xk.js
var _0002_bm_games_default = "create table if not exists bm_games (\n  code text primary key,\n  host_token text not null,\n  rev integer not null default 1,\n  state jsonb not null,\n  updated_at timestamptz not null default now()\n);\n";
var _0003_people_default = "create table if not exists profiles (\n  id text primary key,\n  username text not null unique,\n  pin_hash text not null,\n  first_name text not null,\n  last_name text not null,\n  city text not null default '',\n  state text not null default '',\n  email text not null default '',\n  phone text not null default '',\n  avatar text not null default '',\n  background jsonb not null default '{}',\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\n\ncreate table if not exists profile_sessions (\n  token_hash text primary key,\n  profile_id text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists friendships (\n  id text primary key,\n  from_id text not null,\n  to_id text not null,\n  status text not null,\n  created_at timestamptz not null default now(),\n  unique (from_id, to_id)\n);\n\ncreate table if not exists messages (\n  id text primary key,\n  from_id text not null,\n  to_id text not null,\n  body text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists messages_pair on messages (from_id, to_id, created_at);\n";
var _0004_email_auth_default = "create table if not exists email_challenges (\n  email text primary key,\n  code_hash text not null,\n  attempts int not null default 0,\n  sent_at timestamptz not null default now(),\n  expires_at timestamptz not null,\n  proof_hash text,\n  proof_until timestamptz\n);\n\nalter table profiles add column if not exists email_verified boolean not null default false;\n";
var _0005_staff_default = "alter table profiles add column if not exists rank text not null default 'player';\n\ncreate table if not exists staff (\n  token_hash text primary key,\n  rank text not null\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		if (!databaseUrl) throw new Error("Database unavailable. DATABASE_URL is not set.");
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw new Error(`Database unavailable. ${err instanceof Error ? err.message : "The durable database failed to open."}`);
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const parsers = {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		};
		const boot = async (pg) => {
			await pg.waitReady;
			await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
			return pg;
		};
		try {
			const { mkdirSync } = await import("node:fs");
			const dir = "/workspace/.data/pglite";
			mkdirSync(dir, { recursive: true });
			return await boot(new PGlite(dir, { parsers }));
		} catch (err) {
			console.error("[db] durable preview database failed, retrying", err);
			const { rmSync } = await import("node:fs");
			try {
				rmSync("/workspace/.data/pglite", {
					recursive: true,
					force: true
				});
			} catch {}
			try {
				return await boot(new PGlite("/workspace/.data/pglite", { parsers }));
			} catch (retryErr) {
				if (databaseUrl) throw new Error("Database unavailable. The durable database failed to open.");
				console.error("[db] durable preview database failed, using memory", retryErr);
				return await boot(new PGlite({ parsers }));
			}
		}
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_bm_games.sql": _0002_bm_games_default,
			"/migrations/0003_people.sql": _0003_people_default,
			"/migrations/0004_email_auth.sql": _0004_email_auth_default,
			"/migrations/0005_staff.sql": _0005_staff_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql as t };
