from sqlalchemy import Column, BIGINT, VARCHAR, TEXT
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class MyList(Base):
    __tablename__ = 'lists'
    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    title = Column(VARCHAR(30), nullable=False)
    description = Column(TEXT, nullable=True)

