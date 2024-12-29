import gdb
from gdb import Frame, UnwindInfo

class FrameId:
    def __init__(self, sp: gdb.Value | int, pc: gdb.Value | int, special: gdb.Value | int | None = None) -> None: ...
    @property
    def pc(self) -> gdb.Value | int: ...
    @property
    def sp(self) -> gdb.Value | int: ...
    @property
    def special(self) -> gdb.Value | int | None: ...

class Unwinder:
    @property
    def name(self) -> str: ...
    enabled: bool

    def __init__(self, name: str) -> None: ...
    def __call__(self, pending_frame: Frame) -> UnwindInfo | None: ...

def register_unwinder(locus: gdb.Objfile | gdb.Progspace | None, unwinder: Unwinder, replace: bool = ...) -> None: ...
