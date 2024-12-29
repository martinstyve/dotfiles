from typing_extensions import LiteralString

from sympy.assumptions import Predicate
from sympy.multipledispatch import Dispatcher

class SquarePredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class SymmetricPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class InvertiblePredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class OrthogonalPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class UnitaryPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class FullRankPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class PositiveDefinitePredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class UpperTriangularPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class LowerTriangularPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class DiagonalPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class IntegerElementsPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class RealElementsPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class ComplexElementsPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class SingularPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class NormalPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class TriangularPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...

class UnitTriangularPredicate(Predicate):
    name: LiteralString = ...
    handler: Dispatcher = ...
