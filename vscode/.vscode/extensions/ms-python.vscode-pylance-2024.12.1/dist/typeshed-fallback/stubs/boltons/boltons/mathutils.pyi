from collections.abc import Sequence

def clamp(x: float, lower: float = ..., upper: float = ...) -> float: ...
def ceil(x: float, options: Sequence[float] | None = None) -> float: ...
def floor(x: float, options: Sequence[float] | None = None) -> float: ...

class Bits:
    val: int
    len: int
    def __init__(self, val: int | list[bool] | str | bytes = 0, len_: int | None = None) -> None: ...
    def __getitem__(self, k) -> Bits | bool: ...
    def __len__(self) -> int: ...
    def __eq__(self, other) -> bool: ...
    def __or__(self, other: Bits) -> Bits: ...
    def __and__(self, other: Bits) -> Bits: ...
    def __lshift__(self, other: int) -> Bits: ...
    def __rshift__(self, other: int) -> Bits: ...
    def __hash__(self) -> int: ...
    def as_list(self) -> list[bool]: ...
    def as_bin(self) -> str: ...
    def as_hex(self) -> str: ...
    def as_int(self) -> int: ...
    def as_bytes(self) -> bytes: ...
    @classmethod
    def from_list(cls, list_): ...
    @classmethod
    def from_bin(cls, bin): ...
    @classmethod
    def from_hex(cls, hex): ...
    @classmethod
    def from_int(cls, int_, len_: int | None = None): ...
    @classmethod
    def from_bytes(cls, bytes_): ...
