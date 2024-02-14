"""Merge revisions

Revision ID: cdf4c2c0b96d
Revises: 6c6433554c85, 80616b6ab664
Create Date: 2024-02-13 20:59:21.566934

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cdf4c2c0b96d'
down_revision = ('6c6433554c85', '80616b6ab664')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
