"""foreign key for tv seasons to series

Revision ID: c74d09025b67
Revises: a2c379ddde7a
Create Date: 2024-02-13 21:51:28.739616

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c74d09025b67'
down_revision = 'a2c379ddde7a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tv_seasons', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tv_series_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_tv_seasons_tv_series_id_tv_series'), 'tv_series', ['tv_series_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tv_seasons', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_tv_seasons_tv_series_id_tv_series'), type_='foreignkey')
        batch_op.drop_column('tv_series_id')

    # ### end Alembic commands ###