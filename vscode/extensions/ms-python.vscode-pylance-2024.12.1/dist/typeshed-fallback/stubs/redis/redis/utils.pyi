from _typeshed import Unused
from collections.abc import Iterable, Mapping
from contextlib import AbstractContextManager
from typing import Any, Literal, TypeVar, overload

from .client import Pipeline, Redis, _StrType

_T = TypeVar("_T")

HIREDIS_AVAILABLE: bool
CRYPTOGRAPHY_AVAILABLE: bool

@overload
def from_url(url: str, *, db: int = ..., decode_responses: Literal[True], **kwargs: Any) -> Redis[str]: ...
@overload
def from_url(url: str, *, db: int = ..., decode_responses: Literal[False] = False, **kwargs: Any) -> Redis[bytes]: ...
def pipeline(redis_obj: Redis[_StrType]) -> AbstractContextManager[Pipeline[_StrType]]: ...
def str_if_bytes(value: str | bytes) -> str: ...
def safe_str(value: object) -> str: ...
def dict_merge(*dicts: Mapping[str, _T]) -> dict[str, _T]: ...
def list_keys_to_dict(key_list, callback): ...  # unused, alias for `dict.fromkeys`
def merge_result(command: Unused, res: Mapping[Any, Iterable[_T]]) -> list[_T]: ...
