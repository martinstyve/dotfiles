from collections.abc import Callable
from typing import Any
from typing_extensions import Self

__tracebackhide__: bool

class CollectionMixin:
    def is_iterable(self) -> Self: ...
    def is_not_iterable(self) -> Self: ...
    def is_subset_of(self, *supersets: Any) -> Self: ...
    def is_sorted(self, key: Callable[[Any], Any] = ..., reverse: bool = False) -> Self: ...
