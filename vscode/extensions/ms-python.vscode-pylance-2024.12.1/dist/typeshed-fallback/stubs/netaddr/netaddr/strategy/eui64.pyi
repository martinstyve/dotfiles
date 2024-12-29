from collections.abc import Iterable, Sequence
from re import Pattern
from typing import ClassVar, Literal

width: Literal[64]
version: Literal[64]
max_int: int

class eui64_base:
    word_size: ClassVar[int]
    num_words: ClassVar[int]
    max_word: ClassVar[int]
    word_sep: ClassVar[str]
    word_fmt: ClassVar[str]
    word_base: ClassVar[int]

class eui64_unix(eui64_base): ...
class eui64_unix_expanded(eui64_unix): ...
class eui64_cisco(eui64_base): ...
class eui64_bare(eui64_base): ...

DEFAULT_EUI64_DIALECT: type[eui64_base]
RE_EUI64_FORMATS: list[Pattern[str]]

def valid_str(addr: str) -> bool: ...
def str_to_int(addr: str) -> int: ...
def int_to_str(int_val: int, dialect: type[eui64_base] | None = None) -> str: ...
def int_to_packed(int_val: int) -> bytes: ...
def packed_to_int(packed_int: bytes) -> int: ...
def valid_words(words: Iterable[int], dialect: type[eui64_base] | None = None) -> bool: ...
def int_to_words(int_val: int, dialect: type[eui64_base] | None = None) -> tuple[int, ...]: ...
def words_to_int(words: Sequence[int], dialect: type[eui64_base] | None = None) -> int: ...
def valid_bits(bits: str, dialect: type[eui64_base] | None = None) -> bool: ...
def bits_to_int(bits: str, dialect: type[eui64_base] | None = None) -> int: ...
def int_to_bits(int_val: int, dialect: type[eui64_base] | None = None) -> str: ...
def valid_bin(bin_val: str, dialect: type[eui64_base] | None = None) -> bool: ...
def int_to_bin(int_val: int) -> str: ...
def bin_to_int(bin_val: str) -> int: ...
