"""adding thumbnail to movies

Revision ID: 32dfbb946aac
Revises: c3cc9479533d
Create Date: 2024-01-08 18:35:33.787591

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '32dfbb946aac'
down_revision = 'c3cc9479533d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('movies', schema=None) as batch_op:
        batch_op.add_column(sa.Column('thumbnail', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('movies', schema=None) as batch_op:
        batch_op.drop_column('thumbnail')

    # ### end Alembic commands ###
