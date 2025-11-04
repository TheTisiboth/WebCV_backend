#!/bin/bash
set -e

# This script runs only on first initialization when the data directory is empty
# For existing volumes, password must be reset manually or via a separate mechanism

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Ensure password is set with proper SCRAM-SHA-256 encryption
    ALTER USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
EOSQL

echo "Database user password configured"
