"""season and tv episodes

Revision ID: 04f16d708cc5
Revises: cdf4c2c0b96d
Create Date: 2024-02-13 20:59:37.752088

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '04f16d708cc5'
down_revision = 'cdf4c2c0b96d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('episodes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('episode_number', sa.String(), nullable=True),
    sa.Column('episode_name', sa.String(), nullable=True),
    sa.Column('director', sa.String(), nullable=True),
    sa.Column('writer', sa.String(), nullable=True),
    sa.Column('year_of_release', sa.String(), nullable=True),
    sa.Column('thumbnail', sa.String(), nullable=True),
    sa.Column('motion_picture_rating', sa.String(), nullable=True),
    sa.Column('episode_time', sa.String(), nullable=True),
    sa.Column('summary', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('popularity', sa.Integer(), nullable=True),
    sa.Column('num_of_clicks', sa.Integer(), nullable=True),
    sa.Column('stars', sa.String(), nullable=True),
    sa.Column('all_cast_and_crew', sa.String(), nullable=True),
    sa.Column('video_path', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tv_seasons',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('season_number', sa.String(), nullable=True),
    sa.Column('season_name', sa.String(), nullable=True),
    sa.Column('director', sa.String(), nullable=True),
    sa.Column('writer', sa.String(), nullable=True),
    sa.Column('year_of_release', sa.String(), nullable=True),
    sa.Column('thumbnail', sa.String(), nullable=True),
    sa.Column('motion_picture_rating', sa.String(), nullable=True),
    sa.Column('episode_count', sa.String(), nullable=True),
    sa.Column('average_episode_time', sa.String(), nullable=True),
    sa.Column('is_airing', sa.String(), nullable=True),
    sa.Column('summary', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('popularity', sa.Integer(), nullable=True),
    sa.Column('num_of_clicks', sa.Integer(), nullable=True),
    sa.Column('stars', sa.String(), nullable=True),
    sa.Column('all_cast_and_crew', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tv_seasons')
    op.drop_table('episodes')
    # ### end Alembic commands ###
