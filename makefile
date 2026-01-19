update:
	docker compose exec app npx prisma migrate dev --name auto
	docker compose exec app npx prisma generate --config /app/prisma.config.ts

migrate:
	docker compose exec app npx prisma migrate dev --name auto

generate:
	docker compose exec app npx prisma generate --config /app/prisma.config.ts
