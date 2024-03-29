"""second migration.

Revision ID: 9b39b67932a5
Revises: 
Create Date: 2024-03-27 22:10:22.512371

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b39b67932a5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_user_logins')
    with op.batch_alter_table('user_logins', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(length=100), nullable=True))
        batch_op.create_unique_constraint(batch_op.f('uq_user_logins_username'), ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_logins', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_user_logins_username'), type_='unique')
        batch_op.drop_column('email')

    op.create_table('_alembic_tmp_user_logins',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(length=50), nullable=False),
    sa.Column('password', sa.VARCHAR(length=50), nullable=False),
    sa.Column('email', sa.VARCHAR(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email', name='uq_user_logins_email'),
    sa.UniqueConstraint('username', name='uq_user_logins_username')
    )
    # ### end Alembic commands ###
